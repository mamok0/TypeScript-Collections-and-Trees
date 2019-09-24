import * as Search from './binaryTreeStrategy';

export class InOrderSearch<K, V> implements Search.SearchAlgorithm<K, V> {
  public search(key: K, node: Search.INode<K, V> | null) : V | null {
    if (node == null) return null;
    const leftNode : V | null = this.search(key, node.left);

    if (node.data.key === key) {
      return node.data.value;
    }

    const rightNode : V | null = this.search(key, node.right);
    return leftNode || rightNode;
  }
}