interface INode<K, V> {
  data: {key: K, value: V};
  left : INode<K, V> | null;
  right : INode<K, V> | null;
}

export abstract class SearchAlgorythm<K, V> {
  abstract search(key: K, node: INode<K, V> | null) : V | null;
}

export class PreOrderSearch<K, V> implements SearchAlgorythm<K, V> {
  public search(key: K, node: INode<K, V> | null) : V | null {
    if (node == null) return null;
    
    if (node.data.key === key) {
      return node.data.value;
    }

    const leftNode : V | null = this.search(key, node.left);
    const rightNode : V | null = this.search(key, node.right);
    return leftNode || rightNode;
  }
}

export class InOrderSearch<K, V> implements SearchAlgorythm<K, V> {
  public search(key: K, node: INode<K, V> | null) : V | null {
    if (node == null) return null;
    const leftNode : V | null = this.search(key, node.left);

    if (node.data.key === key) {
      return node.data.value;
    }

    const rightNode : V | null = this.search(key, node.right);
    return leftNode || rightNode;
  }
}

export class PostOrderSearch<K, V> implements SearchAlgorythm<K, V> {
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



export class BinaryTree<K, V> {
  public root : INode<K, V> | null;
  private searchAlgorythm? : SearchAlgorythm<K, V>;

  constructor() {
    this.root = null;
  }

  set getAlgorythm(searchAlgorythm: SearchAlgorythm<K, V>) {
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
    if(!node.left) {
      node.left = newNode;
      return;
    }

    if(!node.right) {
      node.right = newNode;
      return;
    }

    this.insertNode(node.left, newNode);
  }

  public search(key: K, node: INode<K, V> | null) {
     if (this.searchAlgorythm) {
      return this.searchAlgorythm.search(key, node);
     }
     console.log('no chosen algoruthm');
     return null;
  }
}

export default { BinaryTree, PreOrderSearch, InOrderSearch, PostOrderSearch, SearchAlgorythm };