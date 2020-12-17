create table TEAMS
(
    team_id  int auto_increment,
    name     varchar(100) not null,
    patron   varchar(80)  null,
    owner_id int          null,
    constraint team_id
        unique (team_id),
    constraint TEAMS_ibfk_1
        foreign key (owner_id) references USERS (user_id)
);

create index owner_id
    on TEAMS (owner_id);

alter table TEAMS
    add primary key (team_id);

INSERT INTO `5EY9CPMxwB`.TEAMS (team_id, name, patron, owner_id) VALUES (2, 'Druzynka', 'Patronik', 0);
INSERT INTO `5EY9CPMxwB`.TEAMS (team_id, name, patron, owner_id) VALUES (3, 'Druzyna2', 'Patron2', 0);