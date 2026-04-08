from typing import List


# 2751. Robot Collisions
class Solution:
    def survivedRobotsHealths(
        self, positions: List[int], healths: List[int], directions: str
    ) -> List[int]:
        n = len(positions)
        order = sorted(range(n), key=lambda i: positions[i])
        h = healths[:]  # mutate copy

        stack: List[int] = []  # indices (original) of right-moving robots in position order
        alive = [True] * n

        for idx in order:
            if directions[idx] == "R":
                stack.append(idx)
                continue

            # directions[idx] == "L": collide with previous right-moving robots
            while stack and h[idx] > 0:
                j = stack[-1]
                if not alive[j]:
                    stack.pop()
                    continue

                if h[j] == h[idx]:
                    alive[j] = False
                    alive[idx] = False
                    h[j] = 0
                    h[idx] = 0
                    stack.pop()
                    break
                elif h[j] > h[idx]:
                    h[j] -= 1
                    alive[idx] = False
                    h[idx] = 0
                    break
                else:
                    h[idx] -= 1
                    alive[j] = False
                    h[j] = 0
                    stack.pop()

        return [h[i] for i in range(n) if alive[i]]


Solution2751 = Solution


# 2075. Decode the Slanted Ciphertext
class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        if rows == 0:
            return ""
        if not encodedText:
            return ""

        cols = len(encodedText) // rows
        if cols == 0:
            return ""

        out: List[str] = []
        for start_col in range(cols):
            r = 0
            c = start_col
            while r < rows and c < cols:
                out.append(encodedText[r * cols + c])
                r += 1
                c += 1

        return "".join(out).rstrip()


Solution2075 = Solution


# 874. Walking Robot Simulation
class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        obs = {(x, y) for x, y in obstacles}
        x = y = 0
        # 0:N, 1:E, 2:S, 3:W
        d = 0
        dx = [0, 1, 0, -1]
        dy = [1, 0, -1, 0]

        best = 0
        for cmd in commands:
            if cmd == -2:
                d = (d + 3) % 4
            elif cmd == -1:
                d = (d + 1) % 4
            else:
                for _ in range(cmd):
                    nx = x + dx[d]
                    ny = y + dy[d]
                    if (nx, ny) in obs:
                        break
                    x, y = nx, ny
                    best = max(best, x * x + y * y)

        return best


Solution874 = Solution


def _self_check() -> None:
    s2751 = Solution2751()
    assert s2751.survivedRobotsHealths([5, 4, 3, 2, 1], [2, 17, 9, 15, 10], "RRRRR") == [
        2,
        17,
        9,
        15,
        10,
    ]
    assert s2751.survivedRobotsHealths([3, 5, 2, 6], [10, 10, 15, 12], "RLRL") == [14]
    assert s2751.survivedRobotsHealths([1, 2, 5, 6], [10, 10, 11, 11], "RLRL") == []

    s2075 = Solution2075()
    assert (
        s2075.decodeCiphertext("ch   ie   pr", 3)
        == "cipher"
    )

    s874 = Solution874()
    assert s874.robotSim([4, -1, 3], []) == 25
    assert s874.robotSim([4, -1, 4, -2, 4], [[2, 4]]) == 65


if __name__ == "__main__":
    _self_check()

