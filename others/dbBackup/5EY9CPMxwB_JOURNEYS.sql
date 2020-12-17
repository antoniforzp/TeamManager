create table JOURNEYS
(
    journey_id   int auto_increment,
    title        varchar(100)  not null,
    place        varchar(100)  not null,
    start_date   date          not null,
    end_date     date          not null,
    participants int default 0 not null,
    type         int default 0 not null,
    team_id      int           not null,
    constraint journey_id
        unique (journey_id),
    constraint JOURNEYS_ibfk_1
        foreign key (team_id) references TEAMS (team_id)
);

create index team_id
    on JOURNEYS (team_id);

alter table JOURNEYS
    add primary key (journey_id);

INSERT INTO `5EY9CPMxwB`.JOURNEYS (journey_id, title, place, start_date, end_date, participants, type, team_id) VALUES (3, 'Nowa wyprawa', 'Swiat', '2020-12-09', '2020-12-09', 10, 1, 2);