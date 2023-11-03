create database project4347;
use project4347;
show tables;

create table team(
		teamName varchar(255),
        constraint PK_teamName primary key (teamName)
);

create table manager(
		tName varchar(255) not null,
        fName varchar(255),
        lName varchar(255),
        birthday date,
        constraint PK_manager primary key (tName,fName,lName),
        constraint FK_managerTname foreign key (tName) references team(teamName)
        on delete cascade on update cascade
);


create table player(
		playerID int not null,
        fName varchar(255),
        lName varchar(255),
        birthday date,
        position varchar(20),
        tName varchar(20),
        constraint PK_player primary key (playerID),
        constraint FK_player foreign key (tName) references team(teamName)
        on delete cascade on update cascade
);

create table match_(
		matchNum int not null,
		matchTime time,
        homeScore int,
        awayScore int,
        location varchar(255),
        constraint PK_match primary key (matchNum)
);

create table partecipatedIn(
		playerID int not null,
        matchNum int not null,
        blocks int,
        assists int,
        minutesPlayed int,
        pointScored int,
        passesMade int,
        constraint PK_partecipatedIn primary key (playerID,matchNum),
        constraint FK_partecipatedIn_id foreign key (playerID) references player(playerID),
        constraint FK_partecipatedIn_matchNum foreign key (matchNum) references match_(matchNum)
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
        constraint FK_playedIn_away foreign key (homeTeam) references team(teamName)
        on delete cascade on update cascade
);