import * as List from './linkedList';

class Queue<T>{
  private list = new List.LinkedList<T>();

  public length() {
    return this.list.length;
  }

  public push(value: T) {
    this.list.prepend(value);
  }

  public pop() {
    this.list.deleteFirst();
  }

}

export default Queue;