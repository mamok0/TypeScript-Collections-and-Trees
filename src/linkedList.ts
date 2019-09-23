interface INode<T> {
  value: T;
  prev?: INode<T> | null;
  next?: INode<T> | null;
}


class LinkedList<T> {
  private head: INode<T> | null | undefined;
  private tail: INode<T> | null | undefined;

  get getTail() : INode<T> | null | undefined {
      return this.tail;
  }

  set setTail(node: INode<T> | null | undefined) {
    this.tail = node;
  }

  get getHead() : INode<T> | null | undefined {
    return this.head;
}
  set setHead(node: INode<T> | null | undefined) {
    this.head = node;
  }


  public append = (value: T): LinkedList<T> => {
      const node = this.createNode(value);

      if (this.isEmpty()) {
          this.head = node;
          this.tail = node;
          return this;
      }

      if (this.tail) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }

      return this;
  };
  
  public isEmpty = () => !this.head;
  
  public toArray = (): T[] => {
      const result: T[] = [];
      let node = this.head;
      while (node) {
          result.push(node.value);
          node = node.next;
      }
      return result;
  };

  public length() {
    let count = 0;
    let node = this.head;
    while (node) {
        node = node.next;
        count += 1;
    }
    return count;
  }
  
  constructor(values: T[]) {
      values.forEach(v => this.append(v));
      return this;
  };

  private createNode = (value: T): INode<T> => {
      return { value };
  };
}

export {LinkedList, INode};