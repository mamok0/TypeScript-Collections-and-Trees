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

  public insertNode(node: INode<T>, newNode : INode<T>) {
    if (node.children.length < this.childrenAmount) {
      node.children.push(newNode);
      return node;
    }
    console.log('a');
    for(let index = 0; index < node.children.length; index += 1){
      const val = this.insertNode(node.children[index], newNode);
      if (val) {
        break;
      }
    }
    return null;
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
        if(this.contains(searchValue, childNode)) {

          isFound = true;
        }
      });
    }

    return isFound;
  }
}

export default CustomLeavesAmountTree;