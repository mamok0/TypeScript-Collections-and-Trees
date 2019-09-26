import * as List from './linkedList';

class Stack<T>{
  private list = new List.LinkedList<T>();

  public push(value: T) {
    this.list.append(value);
  }

  public length() {
    return this.list.length;
  }

  public pop() {
    this.list.deleteLast();
  }
}

export default Stack;