# /*
# Enter your query below.
# Please append a semicolon ";" at the end of the query
# */

# select buyer_id + 'TOTAL_WORTH'
# from house
#     Join price
#     on house.house_id = price.house_id
# Group by buyer_id
# having (SUM(price.price) > 100000000) AND (Count(*)>1)
# ;

