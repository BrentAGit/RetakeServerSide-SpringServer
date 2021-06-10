INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Over the ocean', 'Yoren Daelens', 2008);

INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Mountain Man', 'Peter Moons', 2017);

INSERT INTO BOOK(id, title, author, release_year)
    VALUES(nextval('BOOK_SEQ'), 'Just another love story', 'Bart Verdaelen', 2012);

INSERT INTO GENRE(id, genreName)
    VALUES(nextval('GENRE_SEQ'), 'Horror')

INSERT INTO GENRE(id, genreName)
    VALUES(nextval('GENRE_SEQ'), 'Romance')

INSERT INTO GENRE(id, genreName)
    VALUES(nextval('GENRE_SEQ'), 'Comedy')
