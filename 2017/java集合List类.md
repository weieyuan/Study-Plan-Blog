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
