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
 -- What are the top five (ranked in decreasing order)
 -- single-channel media types that correspond to the most money
 -- the grocery chain had spent on its promotional campaigns?

 Single Media Channel Types are promotions that contain only one media type.

 EXPECTED OUPTUT:
 Note: Please use the column name(s) specified in the expected output in your solution.
 +---------------------------+------------+
 | single_channel_media_type | total_cost |
 +---------------------------+------------+
 | In-Store Coupon           | 70800.0000 |
 | Street Handout            | 70627.0000 |
 | Radio                     | 60192.0000 |
 | Sunday Paper              | 56994.0000 |
 | Product Attachment        | 50815.0000 |
 +---------------------------+------------+
 
-------------- PLEASE WRITE YOUR SQL SOLUTION BELOW THIS LINE ----------------
 */


select media_type as single_channel_media_type, DECIMAL(SUM(cost),4) as total_cost
from promotions
where media_type not like '%,%'
group by media_type
ORDER BY total_cost DESC




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
 -- Of sales that had a valid promotion, the VP of marketing
 -- wants to know what % of transactions occur on either
 -- the very first day or the very last day of a promotion campaign.
 
 
 EXPECTED OUTPUT:
 Note: Please use the column name(s) specified in the expected output in your solution.
 +-------------------------------------------------------------+
 | pct_of_transactions_on_first_or_last_day_of_valid_promotion |
 +-------------------------------------------------------------+
 |                                         41.9047619047619048 |
 +-------------------------------------------------------------+
  
 -------------- PLEASE WRITE YOUR SQL SOLUTION BELOW THIS LINE ----------------
 
 (SUM(case 
    when 
  ((s.transaction_date = p.start_date) or (s.transaction_date = p.end_date))
    then 1 else 0 
    end)/COUNT(*) * 1.0) * 100 as pct_of_transactions_on_first_or_last_day_of_valid_promotion
 */
select 
 SUM(case 
    when 
  ((s.transaction_date = p.start_date) or (s.transaction_date = p.end_date))
    then 1 else 0 
    end) / (COUNT(*) * 1.00) * 100 as pct_of_transactions_on_first_or_last_day_of_valid_promotion
from sales as s
join promotions as p
on s.promotion_id = p.promotion_id






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
 PROMPT
 -- The CMO is interested in understanding how the sales of different
 -- product families are affected by promotional campaigns.
 -- To do so, for each of the available product families,
 -- show the total number of units sold,
 -- as well as the ratio of units sold that had a valid promotion
 -- to units sold without a promotion,
 -- ordered by increasing order of total units sold.
 
 
 EXPECTED OUTPUT
 Note: Please use the column name(s) specified in the expected output in your solution.
 +----------------+------------------+--------------------------------------------------+
 | product_family | total_units_sold | ratio_units_sold_with_promo_to_sold_without_promo|
 +----------------+------------------+--------------------------------------------------+
 | Drink          |          43.0000 |                           0.79166666666666666667 |
 | Non-Consumable |         176.0000 |                           0.76000000000000000000 |
 | Food           |         564.0000 |                           0.75155279503105590062 |
 +----------------+------------------+--------------------------------------------------+
 
 -------------- PLEASE WRITE YOUR SQL SOLUTION BELOW THIS LINE ----------------
 */
 
SELECT 
    pc.product_family,
    SUM(s.units_sold) AS total_units_sold,
    SUM(CASE WHEN pr.promotion_id IS NOT NULL THEN s.units_sold ELSE 0 END) * 1.0 /
    NULLIF(SUM(CASE WHEN pr.promotion_id IS NULL THEN s.units_sold ELSE 0 END), 0)
    AS ratio_units_sold_with_promo_to_sold_without_promo
FROM sales s
JOIN products p ON s.product_id = p.product_id
JOIN product_classes pc ON p.product_class_id = pc.product_class_id
LEFT JOIN promotions pr ON s.promotion_id = pr.promotion_id
GROUP BY pc.product_family
ORDER BY total_units_sold ASC;


 
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
 -- The VP of Sales feels that some product categories don't sell
 -- and can be completely removed from the inventory.
 -- As a first pass analysis, they want you to find what percentage
 -- of product categories have never been sold.
 
 EXPECTED OUTPUT:
 Note: Please use the column name(s) specified in the expected output in your solution.
 +-----------------------------------+
 | pct_product_categories_never_sold |
 +-----------------------------------+
 |               13.8888888888888889 |
 +-----------------------------------+

 -------------- PLEASE WRITE YOUR SQL SOLUTION BELOW THIS LINE ----------------
 */
SELECT 
    100.0 * 
    (COUNT(DISTINCT pc.product_category) - COUNT(DISTINCT sold_pc.product_category)) 
    / COUNT(DISTINCT pc.product_category) AS pct_product_categories_never_sold
FROM product_classes pc
LEFT JOIN (
    SELECT DISTINCT pc.product_category
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    JOIN product_classes pc ON p.product_class_id = pc.product_class_id
) sold_pc
ON pc.product_category = sold_pc.product_category;











-- Write your PostgreSQL query statement below

select
contest_id,
ROUND(COUNT(*) / (1.0 * (select COUNT(distinct user_id) from users)) * 100,2) as percentage
from register
group by contest_id
order by 2 desc,1 

-- Write your PostgreSQL query statement below

select 
p.project_id,
ROUND(AVG(e.experience_years),2) as average_years
from project as p
left join employee as e
on p.employee_id = e.employee_id
group by p.project_id

-- Write your PostgreSQL query statement below
SELECT TO_CHAR(trans_date,'YYYY-MM') AS month,
        country,
        COUNT(id) AS trans_count,
        SUM(CASE WHEN state='approved' THEN 1 ELSE 0 END) AS approved_count,
        SUM(amount) AS trans_total_amount,
        SUM(CASE WHEN state='approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country
ORDER BY month

-- Write your PostgreSQL query statement below
with first_data as (select 
customer_id,
MIN(order_date) as first_order_date
from delivery
group by customer_id
)
select
(SUM(case when d.order_date = d.customer_pref_delivery_date then 1 else 0 end) / (COUNT(*) * 1.0)) * 100 as immediate_percentage
from delivery as d
join first_data as fc
on d.customer_id = fc.customer_id
where d.order_date  = fc.first_order_date

-- Write your PostgreSQL query statement below
with first_data as (select 
customer_id,
MIN(order_date) as first_order_date
from delivery
group by customer_id
)
select
ROUND((SUM(case when d.order_date = d.customer_pref_delivery_date then 1 else 0 end) / (COUNT(*) * 1.0)) * 100,2) as immediate_percentage
from delivery as d
join first_data as fc
on d.customer_id = fc.customer_id
where d.order_date  = fc.first_order_date

 -- Write your PostgreSQL query statement below
with emp as (
    select employee_id, manager_id
    from employees
)
select 
employees.employee_id
from employees
left join emp
on employees.manager_id = emp.employee_id
where
employees.salary < 30000
and emp.employee_id is NULL