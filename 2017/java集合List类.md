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
