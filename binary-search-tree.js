class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** countDescendants(): Returns a node's number of descendants */

  countDescendants() {
    let count = 0;
    if (this.left) count += this.left.countDescendants() + 1;
    if (this.right) count += this.right.countDescendants() + 1;
    return count;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (current) {
      if (val < current.val) {
        if (current.left) current = current.left;
        else {
          current.left = new Node(val);
          return this;
        }
      } else if (val > current.val) {
        if (current.right) current = current.right;
        else {
          current.right = new Node(val);
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left) return this.insertRecursively(val, current.left);
      else {
        current.left = new Node(val);
        return this;
      }
    } else if (val > current.val) {
      if (current.right) return this.insertRecursively(val, current.right);
      else {
        current.right = new Node(val);
        return this;
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root) {
      let current = this.root;
      while (current) {
        if (val === current.val) return current;
        else if (val < current.val) current = current.left;
        else if (val > current.val) current = current.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current) {
      if (val === current.val) return current;
      else if (val < current.val) return this.findRecursively(val, current.left);
      else if (val > current.val) return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(current = this.root) {
    let visited = [];
    if (current) {
      visited.push(current.val);
      if (current.left) visited = visited.concat(this.dfsPreOrder(current.left));
      if (current.right) visited = visited.concat(this.dfsPreOrder(current.right));
    }
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(current = this.root) {
    let visited = [];
    if (current) {
      if (current.left) visited = visited.concat(this.dfsInOrder(current.left));
      visited.push(current.val);
      if (current.right) visited = visited.concat(this.dfsInOrder(current.right));
    }
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(current = this.root) {
    let visited = [];
    if (current) {
      if (current.left) visited = visited.concat(this.dfsPostOrder(current.left));
      if (current.right) visited = visited.concat(this.dfsPostOrder(current.right));
      visited.push(current.val);
    }
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    if (this.root) {
      const queue = [this.root];
      while (queue.length) {
        const current = queue.shift();
        visited.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) return null;

    const stack = [{ node: this.root, parent: null, whichChild: null }];
    while (stack.length) {
      const current = stack.pop();
      if (current.node.val === val) {
        if (current.node.left || current.node.right) {
          if (current.node.left && !current.node.right) {
            current.parent[current.whichChild] = current.node.left;
            return current.node;
          } else if (!current.node.left && current.node.right) {
            current.parent[current.whichChild] = current.node.right;
            return current.node;
          } else if (current.node.left && current.node.right) {
            const leastRight = this.findLeast(current.node.right);
            this.remove(leastRight.val);
            current.parent[current.whichChild].val = leastRight.val;
            return current.node;
          }
        } else {
          current.parent[current.whichChild] = null;
          return current.node;
        }
      }
      if (current.node.left) stack.push({ node: current.node.left, parent: current.node, whichChild: 'left' });
      if (current.node.right) stack.push({ node: current.node.right, parent: current.node, whichChild: 'right' });
    }
  }

  /** findLeast(): Returns the node with the lowest value in the tree starting at a given node */

  findLeast(current = this.root) {
    while (current) {
      if (current.left) current = current.left;
      else return current;
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    if (!this.root) return true;
    const stack = [this.root];
    while (stack.length) {
      const current = stack.pop();
      let leftDescendants = 0;
      let rightDescendants = 0;
      if (current.left) {
        leftDescendants += current.left.countDescendants() + 1;
        stack.push(current.left);
      }
      if (current.right) {
        rightDescendants += current.right.countDescendants() + 1;
        stack.push(current.right);
      }
      const diff = leftDescendants - rightDescendants;
      if (diff > 1 || diff < -1) return false;
    }
    return true;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    const vals = this.dfsInOrder();
    vals.pop();
    return vals.pop();
  }

  dfsInOrderIteratively() {
    const visited = [];
    if (this.root) {
      const stack = [{ node: this.root, leftVisited: false }];
      while (stack.length) {
        const current = stack.pop();
        if (current.node.left) {
          if (current.leftVisited) visited.push(current.node.val);
          else {
            stack.push({ node: current.node, leftVisited: true });
            stack.push({ node: current.node.left, leftVisited: false });
          }
        } else visited.push(current.node.val);
        if (current.node.right) {
          if (!current.node.left || current.leftVisited) stack.push({ node: current.node.right, leftVisited: false });
        }
      }
    }
    return visited;
  }
}

module.exports = BinarySearchTree;
