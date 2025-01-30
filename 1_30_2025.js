// Optimized Implementation

class KeyFrequencyTracker {
  constructor() {
    this.keyHash = new Map(); // Stores key frequencies
    this.maxKeyName = null; // Key with max frequency
    this.minKeyName = null; // Key with min frequency
  }

  incrementKey(key) {
    let newFreq = (this.keyHash.get(key) || 0) + 1;
    this.keyHash.set(key, newFreq);

    // Update maxKeyName if this key surpasses the current max
    if (!this.maxKeyName || newFreq > this.keyHash.get(this.maxKeyName)) {
      this.maxKeyName = key;
    }

    // Update minKeyName if:
    // 1. This is the first key added
    // 2. The key was previously at 0 frequency
    // 3. It becomes the lowest frequency key
    if (!this.minKeyName || this.keyHash.get(this.minKeyName) > newFreq) {
      this.minKeyName = key;
    }
  }

  decrementKey(key) {
    if (!this.keyHash.has(key)) return;

    let newFreq = this.keyHash.get(key) - 1;

    if (newFreq > 0) {
      this.keyHash.set(key, newFreq);
    } else {
      this.keyHash.delete(key);
    }

    // Update maxKeyName if the current max key was decremented
    if (key === this.maxKeyName) {
      this.maxKeyName = this._findMaxKey();
    }

    // Update minKeyName if the current min key was decremented
    if (key === this.minKeyName) {
      this.minKeyName = this._findMinKey();
    }
  }

  getMaxKey() {
    return this.maxKeyName;
  }

  getMinKey() {
    return this.minKeyName;
  }

  _findMaxKey() {
    let maxKey = null;
    let maxVal = -Infinity;

    for (const [key, value] of this.keyHash) {
      if (value > maxVal) {
        maxVal = value;
        maxKey = key;
      }
    }
    return maxKey;
  }

  _findMinKey() {
    let minKey = null;
    let minVal = Infinity;

    for (const [key, value] of this.keyHash) {
      if (value < minVal) {
        minVal = value;
        minKey = key;
      }
    }
    return minKey;
  }
}

// Example usage:
const tracker = new KeyFrequencyTracker();
tracker.incrementKey("foo");
tracker.incrementKey("bar");
tracker.incrementKey("foo");
tracker.decrementKey("bar");

console.log(tracker.getMaxKey()); // "foo"
console.log(tracker.getMinKey()); // "foo" or "bar" depending on frequency

// Why This Works Efficiently
// Increment Key

// Updates maxKeyName immediately if the new frequency surpasses the current max.
// Updates minKeyName only if necessary.
// Decrement Key

// If the decremented key was the maxKeyName, we re-scan to find the new max.
// If the decremented key was the minKeyName, we re-scan to find the new min.
// Efficiency

// O(1) for incrementKey in most cases.
// O(1) for decrementKey unless it affects maxKeyName or minKeyName, then worst-case O(n).
// O(n) only if a full scan is needed (when max/min key is decremented to a lower value and needs replacement).
// This should be much more efficient than iterating over everything on every update while keeping it simple. 🚀