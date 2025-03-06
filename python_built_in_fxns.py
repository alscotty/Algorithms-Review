cat_list = [
    {
        "name": "Lenny",
        "breed": "Ragdoll",
        "adopted": False
    },
    {
        "name": "Roger",
        "breed": "Siamese",
        "adopted": False
    },
    {
        "name": "Katya",
        "breed": "Persian",
        "adopted": True
    }
]

# Write your code here.
# return all(x == lst[0] for x in lst) if lst else True
def cat_verify(cats):
    return all(cat['breed'] == cats[0]['breed'] for cat in cats)

print(cat_verify(cat_list))    # False


cards = [
    {
        "company": "Wells Fargo",
        "card_name": "Active Cash",
        "annual_fee": 0,
        "intro_reward_type": "cash",
        "intro_reward_amount": 200,
        "num_users": 20
    },
    {
        "company": "Chase",
        "card_name": "Sapphire Preferred",
        "annual_fee": 95,
        "intro_reward_type": "points",
        "intro_reward_amount": 60000,
        "num_users": 54
    },
    {
        "company": "Citi",
        "card_name": "Diamond Preferred",
        "annual_fee": 0,
        "intro_reward_type": "cash",
        "intro_reward_amount": 150,
        "num_users": 13
    }
]

# Write your code here.
     # Chase, Wells Fargo, Citi

def get_num_users(user):
    return user['num_users']

sorted_cards_on_num_users = sorted(cards, key=get_num_users, reverse=True)
print(list(map(lambda x: x['company'],sorted_cards_on_num_users)))


teachers = [
    {
        "name": "Emily Richardson",
        "subjects": ["Geometry", "Geometry Honors"],
        "years_active": 5,
        "classroom": {
            "building_id": "A",
            "room_number": 12,
            "capacity": 45
        }
    },
    {
        "name": "Richard Emilyson",
        "subjects": ["English 11", "AP English Language"],
        "years_active": 12,
        "classroom": {
            "building_id": "J",
            "room_number": 42,
            "capacity": 60
        }
    },
    {
        "name": "Richly Emiardson",
        "subjects": ["Chemistry", "Chemistry Honors", "AP Chemistry"],
        "years_active": 8,
        "classroom": {
            "building_id": "C",
            "room_number": 5,
            "capacity": 32
        }
    },
]

# Write your code here.
def sorter(teacher):
    return teacher['classroom']['capacity']

def sort_teachers_by_classroom_capacity(card_list):
    card_list.sort(key=sorter)
    return list(map(lambda x: x['name'],card_list))


print(sort_teachers_by_classroom_capacity(teachers)) 
# Richly Emiardson, Emily Richardson, Richard Emilyson
