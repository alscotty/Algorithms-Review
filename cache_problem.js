// Final Complexity Summary:
// Time Complexity:
// set(key, value): O(n) (worst case due to eviction).
// get(key): O(1).
// evictLowestRank(): O(n).
// Space Complexity: O(n).

class Rankable {
    async getRank(key) {
      // Simulate an external API call to get the rank of a key
      return Math.floor(Math.random() * 100); // Replace with actual API call
    }
  }
  
  class RetainCache extends Rankable {
    constructor(capacity) {
      super();
      this.capacity = capacity;
      this.cache = new Map(); // Store key-value pairs
      this.ranks = new Map(); // Store key-rank pairs
    }
  
    async set(key, value) {
      if (this.cache.has(key)) {
        this.cache.set(key, value);
        return;
      }
      
      if (this.cache.size >= this.capacity) {
        await this.evictLowestRank();
      }
      
      const rank = await this.getRank(key);
      this.cache.set(key, value);
      this.ranks.set(key, rank);
    }
  
    get(key) {
      return this.cache.get(key);
    }
  
    async evictLowestRank() {
      let lowestRankKey = null;
      let lowestRank = Infinity;
      
      for (const [key, rank] of this.ranks.entries()) {
        if (rank < lowestRank) {
          lowestRank = rank;
          lowestRankKey = key;
        }
      }
      
      if (lowestRankKey !== null) {
        this.cache.delete(lowestRankKey);
        this.ranks.delete(lowestRankKey);
      }
    }
  }
  
  // Example usage
  (async () => {
    const cache = new RetainCache(3);
    await cache.set("a", "value1");
    await cache.set("b", "value2");
    await cache.set("c", "value3");
    console.log(cache.cache);
    await cache.set("d", "value4"); // This should trigger an eviction
    console.log(cache.cache);
  })();
  


  // Possible optimization with heaps:

//   Insertions (set) are O(log n) instead of O(n).
// Finding the lowest-ranked item is O(1) (since it's always at the top of the heap).
// Eviction (evictLowestRank) is O(log n) (removal from a heap is logarithmic).
  class Rankable {
    async getRank(key) {
      // Simulate an external API call to get the rank of a key
      return Math.floor(Math.random() * 100); // Replace with actual API call
    }
  }
  
  class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    push(key, rank) {
      this.heap.push({ key, rank });
      this.heapifyUp();
    }
  
    pop() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
      return min;
    }
  
    peek() {
      return this.heap.length ? this.heap[0] : null;
    }
  
    heapifyUp() {
      let idx = this.heap.length - 1;
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        if (this.heap[parentIdx].rank <= this.heap[idx].rank) break;
        [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
        idx = parentIdx;
      }
    }
  
    heapifyDown() {
      let idx = 0;
      while (2 * idx + 1 < this.heap.length) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let smallest = left;
        if (right < this.heap.length && this.heap[right].rank < this.heap[left].rank) {
          smallest = right;
        }
        if (this.heap[idx].rank <= this.heap[smallest].rank) break;
        [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
        idx = smallest;
      }
    }
  }
  
  class RetainCache extends Rankable {
    constructor(capacity) {
      super();
      this.capacity = capacity;
      this.cache = new Map(); // Store key-value pairs
      this.heap = new MinHeap(); // Min-Heap for eviction
    }
  
    async set(key, value) {
      if (this.cache.has(key)) {
        this.cache.set(key, value);
        return;
      }
  
      if (this.cache.size >= this.capacity) {
        await this.evictLowestRank();
      }
  
      const rank = await this.getRank(key);
      this.cache.set(key, value);
      this.heap.push(key, rank);
    }
  
    get(key) {
      return this.cache.get(key);
    }
  
    async evictLowestRank() {
      const lowestRankedItem = this.heap.pop();
      if (lowestRankedItem) {
        this.cache.delete(lowestRankedItem.key);
      }
    }
  }
  
  // Example usage
  (async () => {
    const cache = new RetainCache(3);
    await cache.set("a", "value1");
    await cache.set("b", "value2");
    await cache.set("c", "value3");
    console.log(cache.cache);
    await cache.set("d", "value4"); // This should trigger an eviction
    console.log(cache.cache);
  })();
  