/**
 * LeetCode 1857 — Largest Color Value in a Directed Graph (Hard)
 * Recency: featured as a Daily Question on May 26, 2025.  :contentReference[oaicite:1]{index=1}
 *
 * Problem (recap):
 * Given a directed graph with node colors (letters a..z), find the maximum
 * frequency of a single color along any path. If there is a cycle, return -1.
 *
 * Idea:
 * Topological sort. For each node, maintain a 26-length count array indicating
 * the best counts ending at that node. When processing u -> v, update
 * counts[v][c] = max(counts[v][c], counts[u][c] + (color[v]==c)).
 * If processed nodes < n (cycle), return -1.
 */

function largestPathValue(colors, edges) {
  const n = colors.length;
  const g = Array.from({ length: n }, () => []);
  const indeg = Array(n).fill(0);
  for (const [u, v] of edges) { g[u].push(v); indeg[v]++; }

  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);

  const dp = Array.from({ length: n }, () => Array(26).fill(0));
  const code = (ch) => ch.charCodeAt(0) - 97;

  let seen = 0, ans = 0;
  while (q.length) {
    const u = q.shift();
    seen++;
    const c = code(colors[u]);
    dp[u][c] = Math.max(dp[u][c], 1);
    ans = Math.max(ans, dp[u][c]);

    for (const v of g[u]) {
      for (let k = 0; k < 26; k++) {
        dp[v][k] = Math.max(dp[v][k], dp[u][k] + (k === code(colors[v]) ? 1 : 0));
      }
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return seen === n ? ans : -1;
}

// Example:
// const colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]];
// console.log(largestPathValue(colors, edges)); // 3
