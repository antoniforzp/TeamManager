create table if not exists INSTRUCTOR_RANKS
(
    rank_id      int auto_increment,
    name         varchar(80) null,
    abbreviation varchar(80) null,
    constraint rank_id
        unique (rank_id)
);

alter table INSTRUCTOR_RANKS
    add primary key (rank_id);

create table if not exists LANGUAGES
(
    language_id varchar(20)  not null,
    name        varchar(100) not null,
    constraint LANGUAGES_language_id_uindex
        unique (language_id)
);

alter table LANGUAGES
    add primary key (language_id);

create table if not exists RANKS
(
    rank_id      int auto_increment,
    name         varchar(80) not null,
    abbreviation varchar(80) not null,
    max_age      int         not null,
    min_age      int         not null,
    constraint rank_id
        unique (rank_id)
);

alter table RANKS
    add primary key (rank_id);

create table if not exists ROLES
(
    role_id int auto_increment,
    name    varchar(80) not null,
    constraint role_id
        unique (role_id)
);

alter table ROLES
    add primary key (role_id);

create table if not exists THEMES
(
    theme_id     int auto_increment,
    name         varchar(100) not null,
    abbreviation varchar(20)  not null,
    constraint THEMES_theme_id_uindex
        unique (theme_id)
);

alter table THEMES
    add primary key (theme_id);

create table if not exists USERS
(
    user_id  int auto_increment,
    name     varchar(80) not null,
    surname  varchar(80) not null,
    password varchar(80) not null,
    email    varchar(80) not null,
    constraint USERS_email_uindex
        unique (email),
    constraint user_id
        unique (user_id)
);

alter table USERS
    add primary key (user_id);

create table if not exists SETTINGS
(
    user_id     int         not null,
    language_id varchar(20) not null,
    theme_id    int         null,
    constraint SETTINGS_user_id_uindex
        unique (user_id),
    constraint SETTINGS_LANGUAGES_language_id_fk
        foreign key (language_id) references LANGUAGES (language_id)
            on update cascade,
    constraint SETTINGS_THEMES_theme_id_fk
        foreign key (theme_id) references THEMES (theme_id)
            on update cascade,
    constraint SETTINGS_USERS_user_id_fk
        foreign key (user_id) references USERS (user_id)
            on update cascade on delete cascade
);

create table if not exists TEAMS
(
    team_id  int auto_increment,
    name     varchar(100) not null,
    patron   varchar(80)  null,
    owner_id int          null,
    constraint team_id
        unique (team_id),
    constraint TEAMS_fk_USERS_user_id
        foreign key (owner_id) references USERS (user_id)
            on update cascade on delete set null
);

alter table TEAMS
    add primary key (team_id);

create table if not exists JOURNEYS
(
    journey_id  int auto_increment,
    title       varchar(100)  not null,
    place       varchar(100)  not null,
    start_date  date          not null,
    end_date    date          not null,
    description varchar(1000) null,
    team_id     int           not null,
    constraint journey_id
        unique (journey_id),
    constraint JOURNEYS_fk_TEAMS_team_id
        foreign key (team_id) references TEAMS (team_id)
            on update cascade on delete cascade
);

alter table JOURNEYS
    add primary key (journey_id);

create table if not exists MEETINGS
(
    meeting_id  int auto_increment,
    title       varchar(100)  not null,
    place       varchar(100)  not null,
    date        date          not null,
    description varchar(1000) null,
    team_id     int           not null,
    constraint meeting_id
        unique (meeting_id),
    constraint MEETINGS_fk_TEAMS_team_id
        foreign key (team_id) references TEAMS (team_id)
            on update cascade on delete cascade
);

alter table MEETINGS
    add primary key (meeting_id);

create table if not exists PATROLS
(
    patrol_id int auto_increment,
    name      varchar(100) not null,
    team_id   int          not null,
    constraint troop_id
        unique (patrol_id),
    constraint TROOPS_fk_TEAMS_team_id
        foreign key (team_id) references TEAMS (team_id)
            on update cascade on delete cascade
);

create table if not exists SCOUTS
(
    scout_id           int auto_increment,
    name               varchar(80) not null,
    surname            varchar(80) not null,
    pesel              varchar(20) null,
    birth_date         date        null,
    address            varchar(80) null,
    postal_code        varchar(10) null,
    city               varchar(20) null,
    phone              varchar(12) null,
    patrol_id          int         null,
    rank_id            int         null,
    instructor_rank_id int         null,
    team_id            int         null,
    constraint scout_id
        unique (scout_id),
    constraint SCOUTS_PATROLS_patrol_id_fk
        foreign key (patrol_id) references PATROLS (patrol_id)
            on update cascade on delete cascade,
    constraint SCOUTS_fk_INSTRUCTOR_RANKS_rank_id
        foreign key (instructor_rank_id) references INSTRUCTOR_RANKS (rank_id)
            on update cascade on delete set null,
    constraint SCOUTS_fk_RANKS_rank_id
        foreign key (rank_id) references RANKS (rank_id)
            on update cascade on delete set null,
    constraint SCOUTS_fk_TEAMS_team_id
        foreign key (team_id) references TEAMS (team_id)
            on update cascade on delete set null
);

alter table SCOUTS
    add primary key (scout_id);

create table if not exists JOURNEYS_PRESENCE
(
    journey_id int not null,
    scout_id   int not null,
    primary key (journey_id, scout_id),
    constraint JOURNEYS_fk_PRESENCE_JOURNEYS_journey_id
        foreign key (journey_id) references JOURNEYS (journey_id)
            on update cascade on delete cascade,
    constraint JOURNEYS_fk_PRESENCE_SCOUTS_scout_id
        foreign key (scout_id) references SCOUTS (scout_id)
            on update cascade on delete cascade
);

create table if not exists MEETINGS_PRESENCE
(
    meeting_id int not null,
    scout_id   int not null,
    primary key (meeting_id, scout_id),
    constraint MEETINGS_PRESENCE_fk_MEETINGS_meeting_id
        foreign key (meeting_id) references MEETINGS (meeting_id)
            on update cascade on delete cascade,
    constraint MEETINGS_PRESENCE_fk_SCOUTS_scout_id
        foreign key (scout_id) references SCOUTS (scout_id)
            on update cascade on delete cascade
);

create table if not exists SCOUTS_ROLES
(
    scout_id int not null,
    role_id  int not null,
    primary key (scout_id, role_id),
    constraint SCOUTS_ROLES_fk_ROLES_role_id
        foreign key (role_id) references ROLES (role_id)
            on update cascade on delete cascade,
    constraint SCOUTS_ROLES_fk_SCOUTS_scout_id
        foreign key (scout_id) references SCOUTS (scout_id)
            on update cascade on delete cascade
);

