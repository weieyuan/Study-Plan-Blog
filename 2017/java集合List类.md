## List ##
**ArrayList**
* 允许添加null值。
* 和vector是等价的，但是vector是线程安全的。
* 内部使用Object[] elementData来存储数据

**LinkedList**
* LinkedList中的Node节点的结构
```
private static class Node<E>{
  E item;
  Node<E> next;
  Node<E> prev;
  
  Node(Node<E> prev, E element, Node<E> next){
    this.item = element;
    this.next = next;
    this.prev = prev;
  }
}
```

**Vector**
* 线程安全
* 使用Object[] elementData来存储数据
* 如果不提供capacityIncrement参数，那么每次会把size增加一倍

## Map ##
**HashMap**
* 允许key和value为null，和HashTable相比是非线程安全的
* 内部采用数组来存放数据Node<K,V>[] table，put方法中通过K的hash值来计算出对象在table数组中的下标，通过链表来存放相同hash值的对象
```
static class Node<K,V> implements Map.Entry<K, V>{
  final int hash;
  final K key;
  V value;
  Node<K, V> next;
  
  Node(int hash, K key, V value, Node<K, V> next){
    this.hash = hash;
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

```
**LinkedHashMap**
* 有序，默认按照插入的先后顺序排序，使用LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)构造对象，将accessOrder传入true，按照访问顺序排序，最近访问的排在最后面
* 继承自HashMap<K,V>，内部使用了一个双向链表，LinkeHashMap.Entry<K, V> head用于记录链表首节点，LinkedHashMap.Entry<K,V> tail用于记录链表的尾节点
```
static class Entry<K, V> extends HashMap.Node<K,V>{
  Entry<K,V> before, after;
  Entry(int hash, K key, V value, Node<K, V> next){
    super(hash, key, value, next);
  }

}

```
* LinkedHashMap继承于HashMap，但是并没有覆写put方法，HashMap中每个节点的结构是HashMap.Node，而LinkedHashMap中每个节点的结构是LinkedHashMap.Entry，实现的原理是LinkedHashMap中覆写了newNode的方法。

**HashTable**
* Key和Value均不能为null
* HashTable是线程安全的，如果不需要线程安全，那么推荐使用HashMap，如果需要高并发线程安全，那么推荐使用ConcurrentHashMap
* HashTable的线程安全是通过添加synchronized关键字来实现的

**TreeMap**
* 内部使用一颗红黑数来存储数据
* 数据是有序的
  * 根据key的比较来排序，因此要求key是实现了Comparable接口
  * 在TreeMap的构造函数中显示传入Comparator类
* 内部存储数据的结构是：
```
static final class Entry<K,V> implements Map.Entry<K,V>{
  K key;
  V value;
  Entry<K,V> left;
  Entry<K,V> right;
  Entry<K,V> parent;
  boolean color = BLCAK;
  
  Entry(K key, V value, Entry<K,V> parent){
    this.key = key;
    this.value = value;
    this.parent = parent;
  }
}

```

**EnumMap**
* key必须为某一类型的枚举
* key不能为null，value可以为null
* 迭代器的顺序是和key.ordinal()的顺序保持一致
* 内部使用Object[] vals来存储value，value的索引就是key.ordinal()
* 使用K[] keyUniverse来存储所有的枚举值

## Set ##
**HashSet**
* 内部使用HashMap来存储数据，add方法的实现
```
private static final Object PRESENT = new Object();

...

public boolean add(E e){
  return map.put(e, PRESENT) == null;
}

```



