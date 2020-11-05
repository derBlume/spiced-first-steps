DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS cities;


CREATE TABLE actors(
  id SERIAL PRIMARY KEY,
  full_name VARCHAR NOT NULL,
  age INTEGER,
  oscars INTEGER
);

INSERT INTO actors (full_name, age, oscars) VALUES ('Leonardo DiCaprio', 41, 1);
INSERT INTO actors (full_name, age, oscars) VALUES ('Jennifer Lawrence', 25, 1);
INSERT INTO actors (full_name, age, oscars) VALUES ('Samuel L. Jackson', 67, 0);
INSERT INTO actors (full_name, age, oscars) VALUES ('Meryl Streep', 66, 3);
INSERT INTO actors (full_name, age, oscars) VALUES ('John Cho', 43, 0);


SELECT * FROM actors;

-- actors with more than one oscar
SELECT * FROM actors WHERE oscars > 1;

-- actors who are older than 30
SELECT * FROM actors WHERE age > 30;
