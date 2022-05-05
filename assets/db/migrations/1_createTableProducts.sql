DROP TABLE IF EXISTS products;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    price FLOAT NOT NULL,
    category INT NOT NULL,
    description VARCHAR,
    image VARCHAR   
);