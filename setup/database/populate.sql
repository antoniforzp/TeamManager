INSERT INTO `DBTEAMMANAGER`.INSTRUCTOR_RANKS (rank_id, name, abbreviation) VALUES (1, 'instructor-ranks.no-rank.name', 'instructor-ranks.no-rank.abbreviation');
INSERT INTO `DBTEAMMANAGER`.INSTRUCTOR_RANKS (rank_id, name, abbreviation) VALUES (2, 'instructor-ranks.guide.name', 'instructor-ranks.guide.abbreviation');
INSERT INTO `DBTEAMMANAGER`.INSTRUCTOR_RANKS (rank_id, name, abbreviation) VALUES (3, 'instructor-ranks.deputy-scoutmaster.name', 'instructor-ranks.deputy-scoutmaster.abbreviation');
INSERT INTO `DBTEAMMANAGER`.INSTRUCTOR_RANKS (rank_id, name, abbreviation) VALUES (4, 'instructor-ranks.scoutmaster.name', 'instructor-ranks.scoutmaster.abbreviation');

INSERT INTO `DBTEAMMANAGER`.LANGUAGES (language_id, name) VALUES ('en', 'languages.english');
INSERT INTO `DBTEAMMANAGER`.LANGUAGES (language_id, name) VALUES ('pl', 'languages.polish');

INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (1, 'ranks.no-rank.name', 'ranks.no-rank.abbreviation', 99, 0);
INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (2, 'ranks.recruit.name', 'ranks.recruit.abbreviation', 13, 11);
INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (3, 'ranks.pathfinder.name', 'ranks.pathfinder.abbreviation', 14, 12);
INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (4, 'ranks.trouper.name', 'ranks.trouper.abbreviation', 16, 13);
INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (5, 'ranks.scout-proficient.name', 'ranks.scout-proficient.abbreviation', 99, 17);
INSERT INTO `DBTEAMMANAGER`.RANKS (rank_id, name, abbreviation, max_age, min_age) VALUES (6, 'ranks.scout-republic.name', 'ranks.scout-republic.abbreviation', 99, 18);

INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (1, 'roles.private');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (3, 'roles.patrol-medic');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (4, 'roles.patrol-guidon');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (5, 'roles.assistant-patrol-leader');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (6, 'roles.patrol-leader');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (7, 'roles.team-photographer');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (8, 'roles.team-guidon');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (9, 'roles.team-medic');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (10, 'roles.team-quartermaster');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (11, 'roles.assistant-team-leader');
INSERT INTO `DBTEAMMANAGER`.ROLES (role_id, name) VALUES (12, 'roles.team-leader');

INSERT INTO `DBTEAMMANAGER`.THEMES (theme_id, name, abbreviation) VALUES (1, 'themes.default', 'def');
INSERT INTO `DBTEAMMANAGER`.THEMES (theme_id, name, abbreviation) VALUES (2, 'themes.claret', 'car');