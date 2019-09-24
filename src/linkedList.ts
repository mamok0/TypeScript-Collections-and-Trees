interface INode<T> {
  value: T;
  prev?: INode<T> | null;
  next?: INode<T> | null;
}


export class LinkedList<T> {
  private _head: INode<T> | null | undefined;
  private _tail: INode<T> | null | undefined;
  length : number;

  constructor(values?: T[]) {
    this.length = 0;
    if (values) {
      values.forEach(v => {
        this.append(v);
        this.length += 1;
      });
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


  public append(value: T): LinkedList<T> {
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
      this.length += 1;
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

  private createNode = (value: T): INode<T> => {
      return { value };
  };
}

export default LinkedList;