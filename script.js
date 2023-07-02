function calculateMinCost() {
  const input = document.getElementById("rope-lengths").value;
  const ropeLengths = input.split(",").map(Number);

  const minCost = findMinimumCost(ropeLengths);

  document.getElementById("result").textContent = minCost;
}

function findMinimumCost(ropeLengths) {
  if (ropeLengths.length === 1) {
    return ropeLengths[0];
  }

  let minCost = 0;
  const minHeap = new MinHeap();

  // Build the min heap with rope lengths
  for (let i = 0; i < ropeLengths.length; i++) {
    minHeap.insert(ropeLengths[i]);
  }

  // Merge ropes until there is only one rope left
  while (minHeap.size() > 1) {
    const firstRope = minHeap.remove();
    const secondRope = minHeap.remove();

    const cost = firstRope + secondRope;
    minCost += cost;

    minHeap.insert(cost);
  }

  return minCost;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  remove() {
    if (this.size() === 0) {
      return null;
    }

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = lastNode;
      this.heapifyDown();
    }

    return root;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[currentIndex]) {
        break;
      }

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    let nextIndex = null;

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;

      if (leftChildIndex < this.size()) {
        if (this.heap[leftChildIndex] < this.heap[currentIndex]) {
          nextIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < this.size()) {
        if (
          this.heap[rightChildIndex] < this.heap[currentIndex] &&
          this.heap[rightChildIndex] < this.heap[leftChildIndex]
        ) {
          nextIndex = rightChildIndex;
        }
      }

      if (nextIndex === null) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
      nextIndex = null;
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}
