create table RANKS
(
    rank_id      int auto_increment,
    name         varchar(80) not null,
    abbreviation varchar(20) not null,
    min_age      int         not null,
    max_age      int         not null,
    constraint rank_id
        unique (rank_id)
);

alter table RANKS
    add primary key (rank_id);

INSERT INTO `5EY9CPMxwB`.RANKS (rank_id, name, abbreviation, min_age, max_age) VALUES (1, 'Młodzik', 'mł.', 12, 15);