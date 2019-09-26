import * as List from './linkedList';

class Stack<T>{
  private list = new List.LinkedList<T>();

  public push(value: T): void {
    this.list.append(value);
  }

  get length(): number {
    return this.list.length;
  }

  public pop(): void {
    this.list.deleteLast();
  }
}

export default Stack;