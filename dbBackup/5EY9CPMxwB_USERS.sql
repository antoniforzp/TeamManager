create table USERS
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

INSERT INTO `5EY9CPMxwB`.USERS (user_id, name, surname, password, email) VALUES (0, 'Admin', 'Admin', 'Admin', 'admin@admin.com');