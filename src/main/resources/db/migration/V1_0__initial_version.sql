drop table if exists book CASCADE
drop table if exists booksuser CASCADE
drop table if exists genre CASCADE
drop sequence if exists book_seq
drop sequence if exists genre_seq
drop sequence if exists user_seq
create sequence book_seq start with 1 increment by 1
create sequence genre_seq start with 1 increment by 1
create sequence user_seq start with 1 increment by 1
create table book (id integer not null, author varchar(255), release_year integer not null check (release_year>=0 AND release_year<=2021), title varchar(255), primary key (id))
create table booksuser (id integer not null, password varchar(255), role varchar(255), username varchar(255), primary key (id))
create table genre (id integer not null, name varchar(255), primary key (id))
