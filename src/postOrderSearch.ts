import * as Search from './binaryTreeStrategy';

export class PostOrderSearch<K, V> implements Search.ISearchAlgorithm<K, V> {
  public search(key: K, node: Search.INode<K, V> | null) : V | null {
    if (node == null) return null;
    const leftNode : V | null = this.search(key, node.left);
    const rightNode : V | null = this.search(key, node.right);

    if (node.data.key === key) {
      return node.data.value;
    }

    return leftNode || rightNode;
  }
}