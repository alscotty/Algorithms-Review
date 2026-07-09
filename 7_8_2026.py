from __future__ import annotations

from typing import List


# HackerRank: Fraudulent Activity Notifications
# https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem
#
# HackerLand National Bank warns clients about possible fraud. For each day (after
# collecting d prior days of data), compare today's spending to the median spending
# over the previous d days. A notification is sent when today's spending is at least
# twice the median of that trailing window.
#
# The median of an odd-length list is the middle value after sorting. For an even-
# length list, it is the average of the two middle values.
#
# Function: activity_notifications(expenditure, d) -> int
#
# Parameters:
#   expenditure: list of daily spending amounts (non-negative integers, each <= 200)
#   d: number of trailing days used to compute the median
#
# Returns: total number of notifications sent
#
# Constraints:
#   1 <= d < n <= 2 * 10^5
#   0 <= expenditure[i] <= 200
#
# Sample Input 0:
#   9 5
#   2 3 4 2 3 6 8 4 5
# Sample Output 0:
#   2
#
# Explanation (d = 5):
#   Day 6: trailing [2,3,4,2,3], median = 3, spend = 6  -> 6 >= 2*3, notify
#   Day 7: trailing [3,4,2,3,6], median = 3, spend = 8  -> 8 >= 2*3, notify
#   Day 8: trailing [4,2,3,6,8], median = 4, spend = 4  -> 4 <  2*4, no notify
#   Day 9: trailing [2,3,6,8,4], median = 4, spend = 5  -> 5 <  2*4, no notify
#
# Sample Input 1:
#   5 4
#   1 2 3 4 4
# Sample Output 1:
#   0
#
# Explanation: trailing [1,2,3,4], median = 2.5, spend = 4 -> 4 < 2*2.5, no notify


class Solution:
    def activity_notifications(self, expenditure: List[int], d: int) -> int:
        max_spend = 200
        freq = [0] * (max_spend + 1)

        for amount in expenditure[:d]:
            freq[amount] += 1

        notifications = 0

        def alert_threshold() -> int:
            # Minimum spend that triggers a notification: 2 * median.
            seen = 0
            if d % 2 == 1:
                middle = d // 2
                for value in range(max_spend + 1):
                    seen += freq[value]
                    if seen > middle:
                        return 2 * value
            else:
                left = right = 0
                for value in range(max_spend + 1):
                    seen += freq[value]
                    if seen > d // 2 - 1 and left == 0:
                        left = value
                    if seen > d // 2:
                        right = value
                        return left + right
            return 0

        for i in range(d, len(expenditure)):
            if expenditure[i] >= alert_threshold():
                notifications += 1

            freq[expenditure[i - d]] -= 1
            freq[expenditure[i]] += 1

        return notifications


SolutionFraudulentActivity = Solution


def _self_check() -> None:
    solver = SolutionFraudulentActivity()

    assert solver.activity_notifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5) == 2
    assert solver.activity_notifications([1, 2, 3, 4, 4], 4) == 0
    assert solver.activity_notifications([10, 20, 30, 40, 50], 3) == 1
    assert solver.activity_notifications([10, 10, 10, 10, 10, 10], 3) == 0


if __name__ == "__main__":
    _self_check()
