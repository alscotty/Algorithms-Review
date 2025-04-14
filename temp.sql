/*  books                               authors
   +------------------+-----------+    +-------------+-----------+
+->| book_id          | INT (KEY) | +->| author_id   | INT (KEY) |
|  | title            | VARCHAR   | |  | first_name  | VARCHAR   |
|  | author_id        | INT >-----|-+  | last_name   | VARCHAR   |
|  | publication_date | DATE      |    | birthday    | DATE      |
|  | category         | VARCHAR   |    | website_url | VARCHAR   |
|  | price            | DOUBLE    |    +-------------+-----------+
|  +------------------+-----------+       
|  
|   transactions                        customers
|  +------------------+-----------+    +--------------------------+-----------+
|  | transaction_id   | INT (KEY) | +->| customer_id              | INT (KEY) |<-+
+-<| book_id          | INT       | |  | first_name               | VARCHAR   |  |
   | customer_id      | INT >-----|-+  | last_name                | VARCHAR   |  |
   | payment_amount   | DOUBLE    |    | registration_date        | DATE      |  |
   | book_count       | INT       |    | interested_in_categories | VARCHAR   |  |
   | tax_rate         | DOUBLE    |    | is_rewards_member        | BOOLEAN   |  |
   | discount_rate    | DOUBLE    |    | invited_by_customer_id   | INT >-----|--+
   | transaction_date | DATE      |    +--------------------------+-----------+
   | payment_type     | VARCHAR   |       
   +------------------+-----------+ 
 authors_in_total | prc_is_dot_com | prc_has_no_transactions 
------------------+----------------+-------------------------
              300 |        62.33.. |                 18.33..
*/
-- COUNT(distinct a.author_id) as num_authors,
-- (SUM(case when a.website_url LIKE '%.com%' then 1 else 0 end)
-- /
-- (COUNT(distinct a.author_id) * 1.0)) * 100 as pct_with_website_com
-- with data as(
-- SELECT 
-- a.author_id,
-- SUM(COALESCE(t.payment_amount,0)) as total_sales_per_author,
-- SUM(case when a.website_url like '%.com%' then 1 else 0 end) as has_com
-- from authors as a
-- left join books as b on a.author_id = b.author_id
-- left join transactions as t on t.book_id = b.book_id
-- group by a.author_id
-- )
-- select 
-- COUNT(author_id) as num_authors,
-- (COUNT(case when has_com > 0 then 1 else 0 end) 
-- /(COUNT(author_id) * 1.0)) * 100
-- as has_com_authors,
-- SUM(case when total_sales_per_author = 0 then 1 else 0 end) as no_sales_authors
-- from data

WITH auth_no_sales as (
    select COUNT(*) as total
 from authors as a
left join books as b on a.author_id = b.author_id
left join transactions as t on t.book_id = b.book_id\
group by a.author_id
having SUM(COALESCE(t.payment_amount,0)) = 0
),
auth_dot_com as (
    select COUNT(*) as total
from authors as a
left join books as b on a.author_id = b.author_id
left join transactions as t on t.book_id = b.book_id
group by a.author_id
HAVING SUM(case when a.website_url like '%.com%' then 1 else 0 end) > 0
),
auth_total as (
    select COUNT(*) as total
from authors as a
group by a.author_id
)
SELECT 
    (SELECT total FROM auth_total) as authors_in_total,
    (SELECT total FROM auth_dot_com) * 100.0 / (SELECT total FROM auth_total) as prc_is_dot_com,
    (SELECT total FROM auth_no_sales) * 100.0 / (SELECT total FROM auth_total) as prc_has_no_transactions

/*
Find the total number of authors.
What percentage of them have a website URL that contains ".com", and
what percentage never made a sale?
*/