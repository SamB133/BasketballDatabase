create database project4347;
use project4347;

CREATE TABLE team(
    teamID INT NOT NULL AUTO_INCREMENT,
    teamName VARCHAR(255) UNIQUE,
    CONSTRAINT PK_team PRIMARY KEY (teamID)
);

create table manager(
    managerID int not null auto_increment,
    tName varchar(255) not null,
    fName varchar(255),
    lName varchar(255),
    birthday date,
    constraint PK_manager primary key (managerID),
    constraint FK_managerTname foreign key (tName) references team(teamName)
    on delete cascade on update cascade
);

create table player(
	playerID int not null auto_increment,
	fName varchar(255),
	lName varchar(255),
	birthday date,
	position varchar(20),
	tName varchar(255),
	constraint PK_player primary key (playerID),
	constraint FK_player foreign key (tName) references team(teamName)
	on delete cascade on update cascade
);

create table match_(
	matchNum int not null auto_increment,
	matchTime time,
	homeScore int,
	awayScore int,
	location varchar(255),
	constraint PK_match primary key (matchNum)
);

create table participatedIn(
	playerID int not null,
	matchNum int not null,
	blocks int,
	assists int,
	minutesPlayed int,
	pointsScored int,
	passesMade int,
	constraint PK_participatedIn primary key (playerID,matchNum),
	constraint FK_participatedIn_id foreign key (playerID) references player(playerID)
	on delete cascade on update cascade,
	constraint FK_participatedIn_matchNum foreign key (matchNum) references match_(matchNum)
	on delete cascade on update cascade
);

create table playedIn(
	Mnum int not null,
	homeTeam varchar(255) not null,
	awayTeam varchar(255) not null,
	constraint PK_playedIn primary key (Mnum,homeTeam,awayTeam),
	constraint FK_playedIn_matchNum foreign key (Mnum) references match_(matchNum)
	on delete cascade on update cascade,
	constraint FK_playedIn_home foreign key (homeTeam) references team(teamName)
	on delete cascade on update cascade,
	constraint FK_playedIn_away foreign key (awayTeam) references team(teamName)
	on delete cascade on update cascade
);
