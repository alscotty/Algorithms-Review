
# select visited_on, amount, avg_amount
# from customers
# where avg_amount=(
# Select AVG(amount) as avg_amount
# from customers
# where visited_on between date_sub(now(),INTERVAL 1 WEEK) and now()
# );


