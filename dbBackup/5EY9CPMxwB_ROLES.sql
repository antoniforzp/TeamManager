create table ROLES
(
    role_id int auto_increment,
    name    varchar(80) not null,
    constraint role_id
        unique (role_id)
);

alter table ROLES
    add primary key (role_id);

INSERT INTO `5EY9CPMxwB`.ROLES (role_id, name) VALUES (1, 'Druzynowy');