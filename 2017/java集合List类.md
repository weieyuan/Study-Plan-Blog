## List ##
**1.LinkedList**
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
**2.HashMap**
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



