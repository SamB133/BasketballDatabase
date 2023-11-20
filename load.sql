LOAD DATA LOCAL INFILE 'data/team.csv'
INTO TABLE team
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(teamName);

LOAD DATA LOCAL INFILE 'data/manager.csv'
INTO TABLE manager
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(tName, fName, lName, birthday);

LOAD DATA LOCAL INFILE 'data/player.csv'
INTO TABLE player
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(fName, lName, birthday, position, tName);

LOAD DATA LOCAL INFILE 'data/match.csv'
INTO TABLE match_
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(matchTime, homeScore, awayScore, location);

LOAD DATA LOCAL INFILE 'data/participatedIn.csv'
INTO TABLE participatedIn
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(playerID, matchNum, blocks, assists, minutesPlayed, pointScored, passesMade);

LOAD DATA LOCAL INFILE 'data/playedIn.csv'
INTO TABLE playedIn
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Mnum, homeTeam, awayTeam);
