### java多线程编程核心技术

#### java多线程技能
java中实现多线程的两种方式：
1.继承Thread
2.实现Runnable接口

isAlive()方法，用于测试线程是否处于活动状态，活动状态指的是线程以及启动但是还没有终止的状态。

停止线程的方法：
1.使用退出标志，使线程正常退出，也就是run方法完成后线程终止
2.使用stop方法强制终止线程，不推荐使用，stop/suspend/resume的方法都是过时的方法
3.使用interrupt方法中断线程

interrupt/interrupted/isInterrupted

```
interrupt：中断线程
interrupted:是静态方法，用于判断当前线程是否被中断，并且会清除中断标志位
isInterrupted:实例方法，用于判断线程是否中断，不会清除标志位
```

一般线程是不可终止的，编写可终止的线程

```
//1
public MyThread extends Thread{
	public void run(){
		try{
			for(;;){
				if(this.interrupted){
					throw new InterruptedException();
				}
			}
			//这句话不会执行
			System.out.println("xxxx");
			
		}
		catch(InterruptedException e){


		}
	
	}
}
//2
public MyThread extends Thread{
	public void run(){
		for(;;){
			if(this.interrupted){
	            break;
			}
		}
		//这句话会执行
		System.out.println("xxxx");
	}
}
```

线程处于sleep状态时，被interrupt，此时线程中可以捕获到中断异常，并且中断的标志位会被清除

suspend用于暂停线程，resume用于重启线程，不推荐使用，因为可能发生死锁。

```
//方法
public class A{
	public synchronized void doSth{
		//doSthing

		Thread.currentThread().suspend();

		//doSthing
	}
}

//线程A中先调用doSth方法
//线程B中调用doSth方法，这样线程B永远被阻塞了
```

yield方法是放弃当前cpu的时间，但是放弃的时间确定，有可能刚放弃，又获得cpu的执行时间

线程优先级具有继承性

守护线程和用户线程，守护线程用于服务其他线程，当所有用户线程运行结束后，守护线程会自动结束。java中的垃圾回收线程就是典型的守护线程。

#### 对象及变量的并发访问
synchronized取得的锁都是对象锁

synchronized拥有重入锁的功能

当一个线程执行的代码出现异常时，其所持有的锁将会自动释放

以下几种场景是使用的同一个锁对象

```
Object obj = new Object();
1.synchronized(obj)
2.obj中的synchronized方法
3.obj中的synchronized(this)方法
```

static方法前面加上synchronized，此时持有的是类的Class对象的锁

尽量不要使用String对象作为锁对象，因为String使用了常量池，有可能造成死锁

```
String aStr = "A";
String bStr = "B";

aStr == bStr //true

String aStr1 = new String("A");
String bStr1 = new String("A");

aStr1 == bStr1 //false

public void method(String str){
	synchronized(str){

	}
}

//线程A中调用
method("AA")

//线程B中调用，线程B和线程A持有的是同一个锁，如果线程A长时间执行，那么线程B将会被阻塞
method("AA")

```

线程之间是否同步的核心是看线程是否持有相同的锁对象。

volatile关键字解决了变量在多个线程之间的可见性，synchronized关键字解决了多个线程之间访问资源的同步性(同时确保了可见性和原子性)。

synchronized不仅可以解决一个线程看到的对象处于不一致的状态，还可以保证进入同步方法或者同步代码块的每个线程，都可以看到由同一个锁保护之前所有的修改效果。以下例子说明问题：

```
////1.运行方式1
public static class Service{
	private boolean b = true;
	
	public void runMethod(){
		
		while(b){
			
		}
		System.out.println("停止。。。。");//这句话在线程1中不会被执行到
	}
	
	public void stopMethod(){
		this.b = false;
	}
}

//mian函数中运行
Service service = new Service();
		
Runnable r1 = new Runnable(){

	@Override
	public void run() {
		service.runMethod();
	}
	
};


Runnable r2 = new Runnable(){

	@Override
	public void run() {
		service.stopMethod();
	}
	
};

Thread t1 = new Thread(r1);
Thread t2 = new Thread(r2);

t1.start();
Thread.sleep(1000);
t2.start();

////2.运行方式2
//1.运行方式1
public static class Service{
	private boolean b = true;
	
	public void runMethod(){
		String a = new String();
		while(b){
			synchronized(a){}
		}
		System.out.println("停止。。。。");//这句话在线程1中会被执行到
	}
	
	public void stopMethod(){
		this.b = false;
	}
}

//mian函数中运行
Service service = new Service();
		
Runnable r1 = new Runnable(){

	@Override
	public void run() {
		service.runMethod();
	}
	
};


Runnable r2 = new Runnable(){

	@Override
	public void run() {
		service.stopMethod();
	}
	
};

Thread t1 = new Thread(r1);
Thread t2 = new Thread(r2);

t1.start();
Thread.sleep(1000);
t2.start();
```

原子类，只能保证原子类中的API是原子操作

#### 线程间通信
等待/通知机制：
wait()方法，将当前线程置入"预执行队列"中，并且在wait所在代码行处停止执行，直到接到通知或者被中断为止。在调用wait时，线程必须获得该对象的锁，执行wait方法后，当前线程释放锁，在从wait方法返回前，线程与其他线程竞争重新获取锁。
notify()方法在调用前，也需要获取对象的锁，用于通知正在等待该对象锁释放的其他线程，该方法会随机通知一个等待的线程，执行notify方法后，并不会立马释放锁，等待该线程的代码执行完后才会释放锁。

线程的状态：
Running:运行状态
Runnable:可运行状态
Blocked：阻塞状态

每个锁对象都有两个队列，一个是就绪队列，用于放置将要获取锁的线程；一个是阻塞队列，用于放置被阻塞的线程。

线程的sleep方法并不会释放锁。
