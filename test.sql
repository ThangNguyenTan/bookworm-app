SELECT books.id, 
COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) AS number_of_1_star_review,
COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) AS number_of_2_star_review,
COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) AS number_of_3_star_review,
COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) AS number_of_4_star_review,
COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) AS number_of_5_star_review,
COUNT(reviews.id) as total_reviews,
(COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) * 1 + COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) * 2
+ COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) * 3 + COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) * 4
+ COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) * 5) / COUNT(reviews.id) AS ratings
FROM books
INNER JOIN reviews ON books.id = reviews.book_id 
GROUP BY books.id
HAVING (COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) * 1 + COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) * 2
+ COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) * 3 + COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) * 4
+ COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) * 5) / COUNT(reviews.id) >= 1

/*Sale*/
SELECT books.id, 
books.book_price AS book_price,
authors.id AS author_id, 
categories.id AS category_id, 
AVG(CAST (reviews.rating_start AS FLOAT))::numeric(10,1) AS ratings,
(CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) AS discount_price
FROM reviews
INNER JOIN books ON books.id = reviews.book_id 
INNER JOIN authors ON books.author_id = authors.id 
INNER JOIN categories ON books.category_id = categories.id 
INNER JOIN discounts ON discounts.book_id = books.id 
GROUP BY books.id, authors.id, categories.id
ORDER BY books.book_price - (CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) DESC

/*Popularity*/
SELECT books.id, 
books.book_price AS book_price,
authors.id AS author_id, 
categories.id AS category_id, 
AVG(CAST (reviews.rating_start AS FLOAT))::numeric(10,1) AS ratings,
(CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) AS discount_price,
COUNT(reviews.id) AS reviews_count
FROM reviews
INNER JOIN books ON books.id = reviews.book_id 
INNER JOIN authors ON books.author_id = authors.id 
INNER JOIN categories ON books.category_id = categories.id 
INNER JOIN discounts ON discounts.book_id = books.id 
GROUP BY books.id, authors.id, categories.id
ORDER BY COUNT(reviews.id) DESC

/*Price Desc*/
SELECT books.id, 
books.book_price AS book_price,
authors.id AS author_id, 
categories.id AS category_id, 
AVG(CAST (reviews.rating_start AS FLOAT))::numeric(10,1) AS ratings,
(CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) AS discount_price,
COUNT(reviews.id) AS reviews_count
FROM reviews
INNER JOIN books ON books.id = reviews.book_id 
INNER JOIN authors ON books.author_id = authors.id 
INNER JOIN categories ON books.category_id = categories.id 
INNER JOIN discounts ON discounts.book_id = books.id 
GROUP BY books.id, authors.id, categories.id
ORDER BY (CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) DESC

/*Price Asc*/
SELECT books.id, 
books.book_price AS book_price,
authors.id AS author_id, 
categories.id AS category_id, 
AVG(CAST (reviews.rating_start AS FLOAT))::numeric(10,1) AS ratings,
(CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) AS discount_price,
COUNT(reviews.id) AS reviews_count
FROM reviews
INNER JOIN books ON books.id = reviews.book_id 
INNER JOIN authors ON books.author_id = authors.id 
INNER JOIN categories ON books.category_id = categories.id 
INNER JOIN discounts ON discounts.book_id = books.id 
GROUP BY books.id, authors.id, categories.id
ORDER BY (CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) ASC


/*
(CASE WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NULL THEN books.book_price 
WHEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
FROM discounts 
WHERE discounts.book_id = books.id 
AND discount_start_date <= CURRENT_DATE
AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
END) 
 */

SELECT books.id, authors.id
FROM books
INNER JOIN authors ON books.author_id = authors.id 
GROUP BY books.id, authors.id 
HAVING authors.id = 1

SELECT books.id, authors.id
FROM books
INNER JOIN authors ON books.author_id = authors.id 
GROUP BY books.id, authors.id 
HAVING authors.id = 1

select avg(reviews.rating_start) from reviews AS reviews_avg_rating_start




