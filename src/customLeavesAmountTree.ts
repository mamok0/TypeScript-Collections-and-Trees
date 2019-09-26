interface INode<T> {
  data: T;
  children: INode<T>[];
}

export class CustomLeavesAmountTree<T> {
  public root: INode<T> | null;
  private childrenAmount: number;

  constructor(childrenAmount: number) {
    this.root = null;
    this.childrenAmount = childrenAmount;
  }

  public insert(value: T): void {
    const newNode = { data: value, children: []};

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  public contains(searchValue: T, node: INode<T> | null = this.root): boolean {
    if (!node) return false;

    if (node.data === searchValue) {
      return true;
    }

    if (!node.children) return false;

    const isFound = node.children.some((childNode) => {
      return this.contains(searchValue, childNode);
    });

    return isFound;
  }

  private isNodeFull(node: INode<T>): boolean {
    return node.children.length === this.childrenAmount;
  }

  private nodeDepthToBottom(node: INode<T>): number {
    let depth = 0;
    let _node = node.children[this.childrenAmount - 1];

    while(_node) {
      depth += 1;
      _node = _node.children[this.childrenAmount - 1];
    }

    return depth;
  }

  public isPerfectNode (node: INode<T>): boolean {

    const isPerfect = node.children.every((childNode) => {
      if (this.isPerfectNode(childNode)) {
        return true;
      } else {
        return false;
      }
    });

    if (this.isNodeFull(node)) {
      return true;
    }

    return isPerfect;
  }

  private insertNode(node: INode<T>, newNode: INode<T>): T {
    if (!this.isNodeFull(node)) {
      node.children.push(newNode);
      return newNode.data;
    }
    let minNodeIndex = 0;
    const minDepth = this.nodeDepthToBottom(node.children[0]);

     const isInserted = node.children.some((childNode, index) => {
      const nodeDepth = this.nodeDepthToBottom(childNode);

      if (!this.isNodeFull(childNode)) {
        childNode.children.push(newNode);
        return true;
      }

      if ((!this.isPerfectNode(childNode) || nodeDepth < minDepth) && minNodeIndex === 0) {
        minNodeIndex = index;
        return false;
      }
    });

    if (isInserted) {
      return newNode.data;
    }

    return this.insertNode(node.children[minNodeIndex], newNode);
  }
}

export default CustomLeavesAmountTree;