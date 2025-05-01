-- Write your PostgreSQL query statement below
select 
name,
bonus
from employee
left join bonus using(empId)
where
bonus is NULL or bonus < 1000
order by bonus ASC


select *
from cinema
where
id % 2 != 0
and description not like '%boring%'
order by rating DESC

select 
p.product_id,
  CASE
        WHEN SUM(u.units) is null
        THEN 0
        ELSE
            ROUND(SUM(u.units * p.price) / SUM(u.units)::numeric, 2)
    END as average_price
from prices as p
left join unitsSold as u
    on u.product_id = p.product_id
    and u.purchase_date between p.start_date and p.end_date
group by p.product_id