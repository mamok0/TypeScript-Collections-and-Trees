import * as List from './linkedList';

class Queue<T>{
  private list = new List.LinkedList<T>();

  get length(): number {
    return this.list.length;
  }

  public push(value: T): void {
    this.list.prepend(value);
  }

  public pop(): void {
    this.list.deleteFirst();
  }
}

export default Queue;