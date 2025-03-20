class Solution:
    def hasGroupsSizeX(self, deck: List[int]) -> bool:
        seen_dict = {}
        for i in range(len(deck)):
            card_value = deck[i]
            if (card_value in seen_dict):
                seen_dict[card_value] += 1
            else:
                seen_dict[card_value] = 1
        
        partition_size = seen_dict[list(seen_dict.keys())[0]]
        print(partition_size)
        print(seen_dict)
        
        for key in seen_dict:
            if (seen_dict[key] <=1):
                return False
            elif (seen_dict[key] != partition_size):
                return False
        
        return True
    