interface INode<T> {
  data: T;
  children : INode<T>[];
}

export class CustomLeavesAmountTree<T> {
  public root : INode<T> | null;
  private childrenAmount : number;

  constructor(childrenAmount: number) {
    this.root = null;
    this.childrenAmount = childrenAmount;
  }

  public insert(value : T) {
    const newNode = { data: value, children: []};

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  public contains(searchValue: T, node: INode<T> | null = this.root) {
    if (node == null) return null;
    console.log(node.data);

    if (node.data === searchValue) {
      return true;
    }

    let isFound = false;

    if (node.children) {
      node.children.forEach(childNode => {
        if (this.contains(searchValue, childNode)) {
          isFound = true;
          return isFound;
        }
      });
    }

    return isFound;
  }

  private isNodeFull(node: INode<T>) {
    return node.children.length === this.childrenAmount;
  }

  private getDepth(node: INode<T>) : number {
    let depth = 0;
    let _node = node.children[this.childrenAmount - 1];

    while(_node) {
      depth += 1;
      _node = _node.children[this.childrenAmount - 1];
    }

    return depth;
  }

  public isPerfectNode (node: INode<T>) : boolean {
    let isPerfect = false;

    node.children.every((childNode) => {
      if (this.isPerfectNode(childNode)) {
        isPerfect = true;
      } else {
        isPerfect = false;
        return true;
      }
    });

    if (this.isNodeFull(node)) {
      return true;
    }

    return isPerfect;
  }

  private insertNode(node: INode<T>, newNode : INode<T>) : any {
    if (!this.isNodeFull(node)) {
      node.children.push(newNode);
      return newNode.data;
    }
    let minNodeIndex = 0;
    let minDepth = this.getDepth(node.children[0]);
    let isInserted = false;

    node.children.some((childNode, index) =>{
      const nodeDepth = this.getDepth(childNode);

      if (!this.isNodeFull(childNode) && nodeDepth <= minDepth) {
        childNode.children.push(newNode);
        isInserted = true;
        return isInserted;
      }

      if (!this.isPerfectNode(childNode) || nodeDepth < minDepth) {
        minNodeIndex = index;
        return true;
      }
    });

    if (isInserted) {
      return newNode.data;
    }

    return this.insertNode(node.children[minNodeIndex], newNode);
  }

}

export default CustomLeavesAmountTree;