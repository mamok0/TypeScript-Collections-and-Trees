import * as Search from './binaryTreeStrategy';

export class PreOrderSearch<K, V> implements Search.ISearchAlgorithm<K, V> {
  public search(key: K, node: Search.INode<K, V> | null) : V | null {
    if (node == null) return null;

    if (node.data.key === key) {
      return node.data.value;
    }

    const leftNode : V | null = this.search(key, node.left);
    const rightNode : V | null = this.search(key, node.right);
    return leftNode || rightNode;
  }
}