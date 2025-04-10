# Write your MySQL query statement below
select name, population, area
from world
where
area >= 3000000
or 
population >= 25000000

# Write your MySQL query statement below
select product_id
from products
where 
low_fats = 'Y'
and 
recyclable = 'Y'

# Write your MySQL query statement below
select
empuni.unique_id,
emp.name
from employees as emp
left join employeeUNI as empuni
on emp.id = empuni.id

# Write your MySQL query statement below
select
p.product_name,
s.year,
s.price
from sales as s
join product as p
on s.product_id = p.product_id

# Write your MySQL query statement below
with manager_info as (
    select managerId, count(*) as num_reports
    from employee
    group by managerId
)
select name
from employee as e
join manager_info as m
on e.id = m.managerId
where m.num_reports >= 5

with counts as (
 select 
    user_id,
    SUM(case when action = 'confirmed' then 1 else 0 end) as num_confirmed,
    COUNT(*) as total
    from confirmations
    group by user_id
)   

with counts as (
 select 
    user_id,
    SUM(case when action = 'confirmed' then 1 else 0 end) as num_confirmed,
    COUNT(*) as total
    from confirmations
    group by user_id
)   

select 
s.user_id,
IF(c.total is NULL,0.00 , ROUND((c.num_confirmed/c.total),2)) as confirmation_rate
from signups as s
left join counts as c
on s.user_id = c.user_id
order by 
IF(c.total is NULL,0.00 , ROUND((c.num_confirmed/c.total),2)) ASC


 /*

 BACKGROUND:
 
 The following schema is a subset of a relational database of a grocery store
 chain. This chain sells many products of different product classes to its
 customers across its different stores. It also conducts many different
 promotion campaigns.
 
 The relationship between the four tables we want to analyze is depicted below:
 
       # sales                                # products
       +------------------+---------+         +---------------------+---------+
       | product_id       | INTEGER |>--------| product_id          | INTEGER |
       | store_id         | INTEGER |    +---<| product_class_id    | INTEGER |
       | customer_id      | INTEGER |    |    | brand_name          | VARCHAR |
  +---<| promotion_id     | INTEGER |    |    | product_name        | VARCHAR |
  |    | store_sales      | DECIMAL |    |    | is_low_fat_flg      | TINYINT |
  |    | store_cost       | DECIMAL |    |    | is_recyclable_flg   | TINYINT |
  |    | units_sold       | DECIMAL |    |    | gross_weight        | DECIMAL |
  |    | transaction_date | DATE    |    |    | net_weight          | DECIMAL |
  |    +------------------+---------+    |    +---------------------+---------+
  |                                      |
  |    # promotions                      |    # product_classes
  |    +------------------+---------+    |    +---------------------+---------+
  +----| promotion_id     | INTEGER |    +----| product_class_id    | INTEGER |
       | promotion_name   | VARCHAR |         | product_subcategory | VARCHAR |
       | media_type       | VARCHAR |         | product_category    | VARCHAR |
       | cost             | DECIMAL |         | product_department  | VARCHAR |
       | start_date       | DATE    |         | product_family      | VARCHAR |
       | end_date         | DATE    |         +---------------------+---------+
       +------------------+---------+

 */ 
 /*
 PROMPT:
 -- What percent of all products in the grocery chain's catalog
 -- are both low fat and recyclable?
 

 EXPECTED OUTPUT:
 Note: Please use the column name(s) specified in the expected output in your solution.
 +----------------------------+
 | pct_low_fat_and_recyclable |
 +----------------------------+
 |         15.384615384615385 |
 +----------------------------+

 -------------- PLEASE WRITE YOUR SQL SOLUTION BELOW THIS LINE ---------------- 
 */
 select 
 SUM(CASE when is_low_fat_flg = 1 and is_recyclable_flg = 1 then 1 else 0 end)/(COUNT(*) * 1.00) as pct_low_fat_and_recyclable
from products





