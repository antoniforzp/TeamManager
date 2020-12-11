create table INSTRUCTOR_RANKS
(
    rank_id      int auto_increment,
    name         varchar(80) not null,
    abbreviation varchar(20) not null,
    constraint rank_id
        unique (rank_id)
);

alter table INSTRUCTOR_RANKS
    add primary key (rank_id);

INSERT INTO `5EY9CPMxwB`.INSTRUCTOR_RANKS (rank_id, name, abbreviation) VALUES (1, 'Przewodnik', 'pwd.');