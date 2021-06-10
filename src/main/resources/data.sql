INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Over the ocean', 'Yoren Daelens', 2008);

INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Mountain Man', 'Peter Moons', 2017);

INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Just another love story', 'Bart Verdaelen', 2012);

INSERT INTO GENRE(id, name)
    VALUES(nextval('GENRE_SEQ'), 'Horror');

INSERT INTO GENRE(id, name)
    VALUES(nextval('GENRE_SEQ'), 'Romance');

INSERT INTO GENRE(id, name)
    VALUES(nextval('GENRE_SEQ'), 'Comedy');

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'brent', '$2y$12$gnmcWdUuWhmAFTMBS6nIveCowoBLCZPjhHnjaAbs8VYFvs/TVIHwK', 'USER');

INSERT INTO BOOKSUSER (ID, USERNAME, PASSWORD, ROLE) VALUES
    (nextval('USER_SEQ'), 'admin', '$2y$12$oqbu45VPonB.UvQoCEXrL.MRY4QIkDuk9WPn.UgP//32sZWaAnq.m', 'ADMIN');

