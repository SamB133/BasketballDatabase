-- Load data for team table
LOAD DATA LOCAL INFILE 'team.csv' INTO TABLE team
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(teamName);

-- Load data for manager table
LOAD DATA LOCAL INFILE 'manager.csv' INTO TABLE manager
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(tName, fName, lName, birthday);

-- Load data for player table
LOAD DATA LOCAL INFILE 'player.csv' INTO TABLE player
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(playerID, fName, lName, birthday, position, tName);

-- Load data for match_ table
LOAD DATA LOCAL INFILE 'match_.csv' INTO TABLE match_
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(matchNum, matchTime, homeScore, awayScore, location);

-- Load data for partecipatedIn table
LOAD DATA LOCAL INFILE 'partecipatedIn.csv' INTO TABLE partecipatedIn
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(playerID, matchNum, blocks, assists, minutesPlayed, pointScored, passesMade);

-- Load data for playedIn table
LOAD DATA LOCAL INFILE 'playedIn.csv' INTO TABLE playedIn
FIELDS TERMINATED BY '\,' 
LINES TERMINATED BY '\n'
(Mnum, homeTeam, awayTeam);