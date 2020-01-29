CREATE TABLE comments_test (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT now(),
  topic VARCHAR(255) NOT NULL,
  parent_comment_id INTEGER,
  text VARCHAR(5000) NOT NULL
);