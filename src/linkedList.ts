interface INode<T> {
  value: T;
  prev?: INode<T> | null;
  next?: INode<T> | null;
}


export class LinkedList<T> {
  private _head: INode<T> | null | undefined;
  private _tail: INode<T> | null | undefined;
  length: number;

  constructor(values?: T[]) {
    this.length = 0;
    if (values) {
      values.forEach(v => {
        this.append(v);
      });
    }
    
    return this;
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
  }

  public prepend(value: T): void {
    const node = this.createNode(value);

    if (this.isEmpty()) {
      this._head = node;
      this._tail = node;
    }

    if (this._head) {
      this._head.prev = node;
      node.next = this._head;
      this._head = node;
    }
    this.length += 1;
  }

  public deleteFirst(): T | undefined {
    const head = this._head;

    if (head) {
      const value = head.value;

      if (head.next) {
        head.next.prev = null;
        this._head = head.next;
        this.length -= 1;
        return value;
      }

      this._head = null;
      return value;
    }
  }

  public deleteLast(): T | undefined | null {
    const tail = this._tail;

    if (tail) {
      const node = tail.prev;

      if (node) {
        node.next = null;
        this._tail = node;
        this.length -= 1;
        return node.value;
      }
    }
    alert('array is empty');
    return null;
  }
  
  public isEmpty = (): boolean => !this._head;
  
  public toArray(): T[] {
      const result: T[] = [];
      let node = this._head;

      while (node) {
          result.push(node.value);
          node = node.next;
      }

      return result;
  }

  private createNode(value: T): INode<T> {
      return { value };
  }
}

export default LinkedList;