from __future__ import annotations

import math
from typing import List


# 3442. Maximum Difference Between Even and Odd Frequency I
class Solution:
    def maxDifference(self, s: str) -> int:
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - 97] += 1

        best_odd = 0
        best_even = 10**9
        for v in freq:
            if v == 0:
                continue
            if v & 1:
                if v > best_odd:
                    best_odd = v
            else:
                if v < best_even:
                    best_even = v
        return best_odd - best_even


Solution3442 = Solution


# 3443. Maximum Manhattan Distance After K Changes
class Solution:
    def maxDistance(self, s: str, k: int) -> int:
        # Manhattan distance after i moves is |x| + |y|.
        # For any fixed choice of "good" directions (a diagonal: {N,E}, {N,W}, {S,E}, {S,W}),
        # we can greedily spend up to k changes to turn "bad" moves into "good" moves.
        def calc(a: str, b: str) -> int:
            changes = 0
            score = 0
            best = 0
            for ch in s:
                if ch == a or ch == b:
                    score += 1
                elif changes < k:
                    changes += 1
                    score += 1
                else:
                    score -= 1
                if score > best:
                    best = score
            return best

        return max(
            calc("N", "E"),
            calc("N", "W"),
            calc("S", "E"),
            calc("S", "W"),
        )


Solution3443 = Solution


# 3444. Minimum Increments for Target Multiples in an Array
class Solution:
    def minimumIncrements(self, nums: List[int], target: List[int]) -> int:
        m = len(target)
        full = (1 << m) - 1

        # lcm_by_mask[mask] = lcm of target elements in mask (mask != 0)
        lcm_by_mask = [1] * (1 << m)
        for mask in range(1, 1 << m):
            l = 1
            for i in range(m):
                if (mask >> i) & 1:
                    l = math.lcm(l, target[i])
            lcm_by_mask[mask] = l

        INF = 10**30
        dp = [INF] * (1 << m)
        dp[0] = 0

        # For each num, we can "assign" it to cover any subset of targets by turning it into a multiple
        # of that subset's LCM. Each num is used at most once in the DP transition.
        for num in nums:
            # cost[mask] = increments needed to make num divisible by lcm_by_mask[mask]
            cost = [0] * (1 << m)
            for mask in range(1, 1 << m):
                l = lcm_by_mask[mask]
                r = num % l
                cost[mask] = 0 if r == 0 else (l - r)

            new = dp[:]  # option: skip this num
            for prev in range(1 << m):
                base = dp[prev]
                if base == INF:
                    continue
                # Try using this num to cover any (non-empty) subset.
                for mask in range(1, 1 << m):
                    nxt = prev | mask
                    v = base + cost[mask]
                    if v < new[nxt]:
                        new[nxt] = v
            dp = new

        return -1 if dp[full] >= INF else int(dp[full])


Solution3444 = Solution


def _self_check() -> None:
    s3442 = Solution3442()
    assert s3442.maxDifference("aaaaabbc") == 3
    assert s3442.maxDifference("abcabcab") == 1

    s3443 = Solution3443()
    assert s3443.maxDistance("NWSE", 1) == 3
    assert s3443.maxDistance("NSWWEW", 3) == 6

    s3444 = Solution3444()
    assert s3444.minimumIncrements([1, 2, 3], [4]) == 1
    assert s3444.minimumIncrements([8, 4], [10, 5]) == 2
    assert s3444.minimumIncrements([7, 9, 10], [7]) == 0


if __name__ == "__main__":
    _self_check()

