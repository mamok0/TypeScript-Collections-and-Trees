import * as List from './linkedList';

class Queue<T>{
  private list = new List.LinkedList<T>([]);

  public length() {
    return this.list.length();
  }

  public push(value: T) {
    this.list.append(value);
  }

  public pop() {
    const head = this.list.head;

    if (head) {
      const value = head.value;

      if (head.next) {
        head.next.prev = null;
        this.list.head = head.next;
        return value;
      }

      this.list.head = null;
      return value;
    }
  }

}

export default Queue;