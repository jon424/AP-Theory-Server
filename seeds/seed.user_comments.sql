BEGIN;

TRUNCATE
  user_comments
 
  RESTART IDENTITY CASCADE;

INSERT INTO user_comments (name, text, topic, parent_comment_id)
VALUES
('NameTest', 'Testing the user comments api', 'pitch', null);
  

COMMIT;
