DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL,
    email VARCHAR (50),
    name VARCHAR (50),
    PASSWORD VARCHAR (50),
    auth BOOLEAN
);