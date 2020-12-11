create table MEETINGS
(
    meeting_id   int auto_increment,
    title        varchar(100)  not null,
    place        varchar(100)  not null,
    date         date          not null,
    participants int default 0 not null,
    team_id      int           not null,
    constraint meeting_id
        unique (meeting_id),
    constraint MEETINGS___fk
        foreign key (team_id) references TEAMS (team_id)
);

alter table MEETINGS
    add primary key (meeting_id);

INSERT INTO `5EY9CPMxwB`.MEETINGS (meeting_id, title, place, date, participants, team_id) VALUES (1, 'Zbiórka', 'Szkoła', '2020-12-10', 0, 2);
INSERT INTO `5EY9CPMxwB`.MEETINGS (meeting_id, title, place, date, participants, team_id) VALUES (2, 'Zbiórka', 'Szkoła', '2020-12-10', 0, 2);