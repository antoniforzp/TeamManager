BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "TEAMS"
(
    "team_id" INTEGER      NOT NULL UNIQUE,
    "name"    VARCHAR(100) NOT NULL,
    "patron"  VARCHAR(80),
    PRIMARY KEY ("team_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ROLES"
(
    "role_id" INTEGER     NOT NULL UNIQUE,
    "name"    VARCHAR(80) NOT NULL,
    PRIMARY KEY ("role_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "TASKS_STATUS"
(
    "task_status_id" INTEGER     NOT NULL UNIQUE,
    "name"           VARCHAR(50) NOT NULL,
    PRIMARY KEY ("task_status_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "RANKS"
(
    "rank_id" INTEGER     NOT NULL UNIQUE,
    "name"    VARCHAR(80) NOT NULL,
    "min_age" INTEGER,
    "max)age" INTEGER,
    PRIMARY KEY ("rank_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "NEW_RANKS_PROGRESS"
(
    "new_rank_progress_id" INTEGER NOT NULL UNIQUE,
    "date_start"           DATE    NOT NULL,
    "rank_id"              INTEGER NOT NULL,
    PRIMARY KEY ("new_rank_progress_id" AUTOINCREMENT),
    FOREIGN KEY ("rank_id") REFERENCES "RANKS" ("rank_id")
);
CREATE TABLE IF NOT EXISTS "TASKS"
(
    "task_id"               INTEGER NOT NULL UNIQUE,
    "new_ranks_progress_id" INTEGER NOT NULL,
    "tasks_status_id"       INTEGER NOT NULL,
    PRIMARY KEY ("task_id" AUTOINCREMENT),
    FOREIGN KEY ("tasks_status_id") REFERENCES "TASKS_STATUS" ("task_status_id"),
    FOREIGN KEY ("new_ranks_progress_id") REFERENCES "NEW_RANKS_PROGRESS" ("new_rank_progress_id")
);
CREATE TABLE IF NOT EXISTS "ORDERS"
(
    "order_id"       INTEGER     NOT NULL UNIQUE,
    "reference"      VARCHAR(80),
    "date"           DATE        NOT NULL,
    "author_name"    VARCHAR(80) NOT NULL,
    "author_surname" VARCHAR(80) NOT NULL,
    "team_id"        INTEGER,
    PRIMARY KEY ("order_id" AUTOINCREMENT),
    FOREIGN KEY ("team_id") REFERENCES "TEAMS" ("team_id")
);
CREATE TABLE IF NOT EXISTS "ACHIEVEMENTS"
(
    "achievement_id" INTEGER     NOT NULL UNIQUE,
    "name"           VARCHAR(80) NOT NULL,
    "difficulty_id"  INTEGER     NOT NULL,
    PRIMARY KEY ("achievement_id" AUTOINCREMENT),
    FOREIGN KEY ("difficulty_id") REFERENCES "ACHIEVEMENTS_DIFFICULTIES" ("difficulty_id")
);
CREATE TABLE IF NOT EXISTS "TEAM_MEETINGS"
(
    "meeting_id" INTEGER      NOT NULL UNIQUE,
    "title"      VARCHAR(100) NOT NULL,
    "place"      VARCHAR(100),
    "date"       DATE         NOT NULL,
    "team_id"    INTEGER      NOT NULL,
    PRIMARY KEY ("meeting_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "SCOUTS"
(
    "scout_id"                    INTEGER     NOT NULL UNIQUE,
    "name"                        VARCHAR(80) NOT NULL,
    "surname"                     VARCHAR(80) NOT NULL,
    "PESEL"                       INTEGER,
    "birth_date"                  DATE,
    "address"                     VARCHAR(80),
    "postal_code"                 VARCHAR(10),
    "city"                        VARCHAR(20),
    "phone"                       INTEGER,
    "father_phone"                INTEGER,
    "mother_phone"                INTEGER,
    "jacket_size"                 VARCHAR(5),
    "shirt_size"                  VARCHAR(5),
    "parents_approval_membership" BOOLEAN,
    "parents_approval_meetings"   BOOLEAN,
    "team_id"                     INTEGER     NOT NULL,
    "troop_id"                    INTEGER     NOT NULL,
    "rank_id"                     INTEGER     NOT NULL,
    "role_id"                     INTEGER     NOT NULL,
    "new_rank_progress_id"        INTEGER     NOT NULL,
    PRIMARY KEY ("scout_id" AUTOINCREMENT),
    FOREIGN KEY ("troop_id") REFERENCES "TROOPS" ("troop_id"),
    FOREIGN KEY ("team_id") REFERENCES "TEAMS" ("team_id"),
    FOREIGN KEY ("new_rank_progress_id") REFERENCES "NEW_RANKS_PROGRESS" ("rank_id"),
    FOREIGN KEY ("rank_id") REFERENCES "RANKS" ("rank_id"),
    FOREIGN KEY ("role_id") REFERENCES "ROLES" ("role_id")
);
CREATE TABLE IF NOT EXISTS "TROOPS"
(
    "troop_id" INTEGER      NOT NULL UNIQUE,
    "name"     VARCHAR(100) NOT NULL,
    "team_id"  INTEGER      NOT NULL,
    PRIMARY KEY ("troop_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ACHIEVEMENTS_HISTORY"
(
    "scout_id"       INTEGER NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "date"           DATE,
    "order_id"       INTEGER,
    PRIMARY KEY ("scout_id", "achievement_id"),
    FOREIGN KEY ("scout_id") REFERENCES "SCOUTS" ("scout_id"),
    FOREIGN KEY ("achievement_id") REFERENCES "ACHIEVEMENTS" ("achievement_id"),
    FOREIGN KEY ("order_id") REFERENCES "ORDERS" ("order_id")
);
CREATE TABLE IF NOT EXISTS "RANKS_HISTORY"
(
    "scout_id" INTEGER NOT NULL,
    "rank_id"  INTEGER NOT NULL,
    "date"     DATE    NOT NULL,
    "order_id" INTEGER NOT NULL,
    PRIMARY KEY ("scout_id", "rank_id"),
    FOREIGN KEY ("scout_id") REFERENCES "SCOUTS" ("scout_id"),
    FOREIGN KEY ("order_id") REFERENCES "ORDERS" ("order_id"),
    FOREIGN KEY ("rank_id") REFERENCES "RANKS" ("rank_id")
);
CREATE TABLE IF NOT EXISTS "TEAM_MEETINGS_PRESENCE"
(
    "meeting_id" INTEGER NOT NULL,
    "scout_id"   INTEGER NOT NULL,
    PRIMARY KEY ("meeting_id", "scout_id"),
    FOREIGN KEY ("scout_id") REFERENCES "SCOUTS" ("scout_id"),
    FOREIGN KEY ("meeting_id") REFERENCES "TEAM_MEETINGS" ("meeting_id")
);
CREATE TABLE IF NOT EXISTS "ACHIEVEMENTS_DIFFICULTIES"
(
    "difficulty_id" INTEGER     NOT NULL UNIQUE,
    "reference"     VARCHAR(50) NOT NULL,
    PRIMARY KEY ("difficulty_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "JOURNEYS_TYPES"
(
    "journey_type_id" INTEGER     NOT NULL UNIQUE,
    "name"            VARCHAR(80) NOT NULL,
    PRIMARY KEY ("journey_type_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "DUES"
(
    "due_id"   INTEGER NOT NULL UNIQUE,
    "amount"   INTEGER NOT NULL DEFAULT 0,
    "date"     DATE    NOT NULL,
    "scout_id" INTEGER NOT NULL,
    PRIMARY KEY ("due_id" AUTOINCREMENT),
    FOREIGN KEY ("scout_id") REFERENCES "SCOUTS" ("scout_id")
);
CREATE TABLE IF NOT EXISTS "JOURNEYS"
(
    "journey_id"      INTEGER      NOT NULL UNIQUE,
    "title"           VARCHAR(100) NOT NULL,
    "start_date"      DATE,
    "end_date"        DATE,
    "members"         INTEGER DEFAULT 0,
    "journey_type_id" INTEGER      NOT NULL,
    "team_id"         INTEGER      NOT NULL,
    PRIMARY KEY ("journey_id" AUTOINCREMENT),
    FOREIGN KEY ("team_id") REFERENCES "TEAMS" ("team_id"),
    FOREIGN KEY ("journey_type_id") REFERENCES "JOURNEYS_TYPES" ("journey_type_id")
);
COMMIT;
