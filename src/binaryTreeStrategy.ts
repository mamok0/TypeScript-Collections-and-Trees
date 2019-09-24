import { networkInterfaces } from "os";

export interface INode<K, V> {
  data: {key: K, value: V};
  left : INode<K, V> | null;
  right : INode<K, V> | null;
}

export interface SearchAlgorithm<K, V> {
  search(key: K, node: INode<K, V> | null) : V | null;
}

export class PostOrderSearch<K, V> implements SearchAlgorithm<K, V> {
  public search(key: K, node: INode<K, V> | null) : V | null {
    if (node == null) return null;
    const leftNode : V | null = this.search(key, node.left);
    const rightNode : V | null = this.search(key, node.right);

    if (node.data.key === key) {
      return node.data.value;
    }

    return leftNode || rightNode;
  }
}

class DefaultSearch<K, V> implements SearchAlgorithm<K, V> {
  public search(key: K, node: INode<K, V> | null) : V | null {
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
  public root : INode<K, V> | null;
  private searchAlgorythm? : SearchAlgorithm<K, V>;

  constructor() {
    this.root = null;
    this.searchAlgorythm = new DefaultSearch<K, V>();
  }

  set getAlgorythm(searchAlgorythm: SearchAlgorithm<K, V>) {
    this.searchAlgorythm = searchAlgorythm;
  }

  public insert(kayValue: { key: K, value: V }) {
    var newNode = { data: kayValue, left: null, right: null }; 

    if(this.root === null) 
      this.root = newNode; 
    else
      this.insertNode(this.root, newNode); 
  }

  private insertNode(node: INode<K, V>, newNode: INode<K, V>) 
  {
    if(node.data.key > newNode.data.key) {
      if(!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }

    if(node.data.key < newNode.data.key) {
      if(!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  public search(key: K, node: INode<K, V> | null) {
     if (this.searchAlgorythm) {
      return this.searchAlgorythm.search(key, node);
     }
     console.log('no chosen algoruthm');
     return null;
  }
}

