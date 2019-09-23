import * as List from './linkedList';

class Stack<T>{
  private list = new List.LinkedList<T>([]);

  public push(value: T) {
    this.list.append(value);
  }

  public length() {
    return this.list.length();
  }

  public pop() {
    const tail = this.list.getTail;

    if (tail) {
      const node = tail.prev;

      if(node) {
        node.next = null;
        this.list.setTail = node;
        return node.value;
      }
    }
    alert('queue is empty');
    return null;
  }
}

export default Stack;