
from collections import defaultdict
from typing import List


# 3838. Weighted Word Mapping
class Solution:
    def mapWordWeights(self, words: List[str], weights: List[int]) -> str:
        out: List[str] = []
        for w in words:
            total = sum(weights[ord(c) - ord("a")] for c in w)
            rem = total % 26
            out.append(chr(ord("z") - rem))
        return "".join(out)


# 3839. Number of Prefix Connected Groups
class Solution:
    def prefixConnected(self, words: List[str], k: int) -> int:
        counts: defaultdict[str, int] = defaultdict(int)
        for w in words:
            if len(w) >= k:
                counts[w[:k]] += 1
        return sum(1 for c in counts.values() if c >= 2)


# 3840. House Robber V (cannot rob adjacent same color)
class Solution:
    def rob(self, nums: List[int], colors: List[int]) -> int:
        not_rob = 0
        rob = nums[0]
        for i in range(1, len(nums)):
            new_not_rob = max(not_rob, rob)
            if colors[i] != colors[i - 1]:
                new_rob = nums[i] + max(not_rob, rob)
            else:
                new_rob = nums[i] + not_rob
            not_rob, rob = new_not_rob, new_rob
        return max(not_rob, rob)


# 3841. Palindromic Path Queries in a Tree
class Solution:
    def palindromePath(
        self,
        n: int,
        edges: List[List[int]],
        s: str,
        queries: List[str],
    ) -> List[bool]:
        g = [[] for _ in range(n)]
        for a, b in edges:
            g[a].append(b)
            g[b].append(a)

        LOG = max(1, n.bit_length())
        up = [[-1] * n for _ in range(LOG)]
        depth = [0] * n
        tin = [0] * n
        tout = [0] * n
        euler: List[int] = []
        node_val = [1 << (ord(s[i]) - ord("a")) for i in range(n)]

        t = 0

        def dfs(v: int, p: int) -> None:
            nonlocal t
            up[0][v] = p
            depth[v] = 0 if p < 0 else depth[p] + 1
            tin[v] = t
            euler.append(v)
            t += 1
            for u in g[v]:
                if u != p:
                    dfs(u, v)
            tout[v] = t - 1

        dfs(0, -1)
        for j in range(1, LOG):
            for v in range(n):
                mid = up[j - 1][v]
                up[j][v] = -1 if mid < 0 else up[j - 1][mid]

        def is_ancestor(u: int, v: int) -> bool:
            return tin[u] <= tin[v] <= tout[u]

        def lca(a: int, b: int) -> int:
            if is_ancestor(a, b):
                return a
            if is_ancestor(b, a):
                return b
            for j in range(LOG - 1, -1, -1):
                pa = up[j][a]
                if pa >= 0 and not is_ancestor(pa, b):
                    a = pa
            return up[0][a]

        class Fenwick:
            def __init__(self, size: int) -> None:
                self.n = size
                self.bit = [0] * (size + 1)

            def add(self, i: int, delta: int) -> None:
                i += 1
                while i <= self.n:
                    self.bit[i] ^= delta
                    i += i & -i

            def prefix(self, i: int) -> int:
                i += 1
                x = 0
                while i > 0:
                    x ^= self.bit[i]
                    i -= i & -i
                return x

            def range_xor(self, l: int, r: int) -> int:
                if l > r:
                    return 0
                return self.prefix(r) ^ self.prefix(l - 1)

        fw = Fenwick(n)
        for i, v in enumerate(euler):
            fw.add(i, node_val[v])

        def path_xor(u: int, v: int) -> int:
            w = lca(u, v)
            pu = up[0][w]
            xu = fw.range_xor(tin[u], tin[u])
            xv = fw.range_xor(tin[v], tin[v])
            xw = fw.range_xor(tin[w], tin[w])
            xp = fw.range_xor(tin[pu], tin[pu]) if pu >= 0 else 0
            return xu ^ xv ^ xw ^ xp

        def can_palindrome(mask: int) -> bool:
            return mask == 0 or (mask & (mask - 1)) == 0

        ans: List[bool] = []
        for q in queries:
            parts = q.split()
            if parts[0] == "update":
                u = int(parts[1])
                c = parts[2]
                newv = 1 << (ord(c) - ord("a"))
                fw.add(tin[u], node_val[u] ^ newv)
                node_val[u] = newv
            else:
                u, v = int(parts[1]), int(parts[2])
                ans.append(can_palindrome(path_xor(u, v)))
        return ans


def _self_check() -> None:
    s3838 = Solution()
    w = ["abcd", "def", "xyz"]
    weights = [
        5,
        3,
        12,
        14,
        1,
        2,
        3,
        2,
        10,
        6,
        6,
        9,
        7,
        8,
        7,
        10,
        8,
        9,
        6,
        9,
        9,
        8,
        3,
        7,
        7,
        2,
    ]
    assert s3838.mapWordWeights(w, weights) == "rij"

    s3839 = Solution()
    assert s3839.prefixConnected(["car", "cat", "cartoon"], 3) == 1

    s3840 = Solution()
    assert s3840.rob([10, 1, 3, 9], [1, 1, 1, 2]) == 22

    s3841 = Solution()
    out = s3841.palindromePath(
        4,
        [[0, 1], [0, 2], [0, 3]],
        "abca",
        ["query 1 2", "query 2 3", "update 0 b", "query 1 3"],
    )
    assert out == [False, False, True]


if __name__ == "__main__":
    _self_check()
