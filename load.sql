LOAD DATA INFILE 'project4347/data/team.csv' INTO TABLE team
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'project4347/data/manager.csv'
INTO TABLE manager
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'project4347/data/player.csv'
INTO TABLE player
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'project4347/data/match.csv'
INTO TABLE match_
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'project4347/data/participatedIn.csv'
INTO TABLE participatedIn
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'project4347/data/playedIn.csv'
INTO TABLE playedIn
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;