export interface INode<K, V> {
  data: {key: K; value: V};
  left: INode<K, V> | null;
  right: INode<K, V> | null;
}

export interface ISearchAlgorithm<K, V> {
  search(key: K, node: INode<K, V> | null): V | null;
}

class BinarySearch<K, V> implements ISearchAlgorithm<K, V> {
  public search(key: K, node: INode<K, V> | null): V | null {
    if (node == null) return null;

    if (node.data.key > key) {
      return this.search(key, node.left);
    } else if (node.data.key < key) {
      return this.search(key, node.right);
    } else {
      return node.data.value;
    }
  }
}

export class BinaryTree<K, V> {
  public root: INode<K, V> | null;
  private searchAlgorithm: ISearchAlgorithm<K, V>;

  constructor() {
    this.root = null;
    this.searchAlgorithm = new BinarySearch<K, V>();
  }

  set algorithm(searchAlgorithm: ISearchAlgorithm<K, V>) {
    this.searchAlgorithm = searchAlgorithm;
  }

  public insert(keyValue: { key: K; value: V }): void {
    const newNode = { data: keyValue, left: null, right: null }; 

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  public search(key: K): V | null {
    return this.searchAlgorithm.search(key, this.root);
  }


  private insertNode(node: INode<K, V>, newNode: INode<K, V>): void
  {
    if (node.data.key > newNode.data.key) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }

    if (node.data.key < newNode.data.key) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

