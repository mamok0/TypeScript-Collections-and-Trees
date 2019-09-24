interface INode<T> {
  value: T;
  prev?: INode<T> | null;
  next?: INode<T> | null;
}


export class LinkedList<T> {
  private _head: INode<T> | null | undefined;
  private _tail: INode<T> | null | undefined;

  constructor(values?: T[]) {
    if (values) {
      values.forEach(v => this.append(v));
    }
    
    return this;
};

  get tail() : INode<T> | null | undefined {
      return this._tail;
  }

  set tail(node: INode<T> | null | undefined) {
    this._tail = node;
  }

  get head() : INode<T> | null | undefined {
    return this._head;
}
  set head(node: INode<T> | null | undefined) {
    this._head = node;
  }


  public append = (value: T): LinkedList<T> => {
      const node = this.createNode(value);

      if (this.isEmpty()) {
          this._head = node;
          this._tail = node;
          return this;
      }

      if (this._tail) {
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
      }

      return this;
  };
  
  public isEmpty = () => !this._head;
  
  public toArray = (): T[] => {
      const result: T[] = [];
      let node = this._head;
      while (node) {
          result.push(node.value);
          node = node.next;
      }
      return result;
  };

  public length() {
    let count = 0;
    let node = this._head;
    while (node) {
        node = node.next;
        count += 1;
    }
    return count;
  }

  private createNode = (value: T): INode<T> => {
      return { value };
  };
}

export default LinkedList;