export type tableNames = 'players' | 'teams' | 'standings' | 'games'
    | 'playersGameStats' | 'users' | 'teamGameStats' | 'teamSeasonStats';


export const createPlayerTable: string =
    `CREATE TABLE IF NOT EXISTS players(
    PlayerID int, Status varchar(255), TeamID int,
    Jersey int, Position varchar(255), FirstName varchar(255),
    LastName varchar(255), Height int, Weight int, BirthDate varchar(255),
    BirthCity varchar(255), BirthState varchar(255), BirthCountry varchar(255),
    College varchar(255), Salary int, Experience int, FanDuelPlayerID int,
    DraftKingsPlayerID int, NbaDotComPlayerID int, Headshot varchar(255),
    UNIQUE(PlayerID))`;

export const createTeamTable: string =
    `CREATE TABLE IF NOT EXISTS teams(
    TeamID int, \`Key\` varchar(255), City varchar(255),
    Name varchar(255), Conference varchar(255),
    Division varchar(255), PrimaryColor varchar(255),
    SecondaryColor varchar(255), TertiaryColor varchar(255),
    WikipediaLogoUrl varchar(255), HeadCoach varchar(255),
    UNIQUE(TeamID))`;

export const createStandingsTable: string =
    `CREATE TABLE IF NOT EXISTS standings(
    TeamID int, season int, conference JSON, division JSON,
    win JSON, loss JSON, gamesBehind int, streak int,
    winStreak boolean, tieBreakerPoints int)`;

export const createGamesTable: string =
    `CREATE TABLE IF NOT EXISTS games(
    id int, season int, date JSON, status JSON, arena JSON,
    teams JSON, scores JSON, timesTied int, leadChanges int,
    UNIQUE(id))`;

export const createPlayersGameStatsTable: string =
    `CREATE TABLE IF NOT EXISTS playersGameStats(
    points int, fgm int, fga int, fgp float,
    ftm int, fta int, ftp float, tpm int, tpa int, tpp float, offReb int,
    defReb int, totReb int, assists int, pFouls int, steals int, turnovers int,
    blocks int, plusMinus int,
    PlayerID int, GameID int, TeamID int, min int)`;

export const createTeamSeasonStatsTable: string =
    `CREATE TABLE IF NOT EXISTS teamSeasonStats(
    points int, fgm int, fga int, fgp float,
    ftm int, fta int, ftp float, tpm int, tpa int, tpp float, offReb int,
    defReb int, totReb int, assists int, pFouls int, steals int, turnovers int,
    blocks int, plusMinus int,
    TeamID int, fastBreakPoints int, pointsInPaint int, biggestLead int,
    secondChancePoints int, pointsOffTurnovers int, longestRun int, games int)`;

export const createTeamGameStatsTable: string =
    `CREATE TABLE IF NOT EXISTS teamGameStats(
    points int, fgm int, fga int, fgp float,
    ftm int, fta int, ftp float, tpm int, tpa int, tpp float, offReb int,
    defReb int, totReb int, assists int, pFouls int, steals int, turnovers int,
    blocks int, plusMinus int,
    TeamID int, fastBreakPoints int, pointsInPaint int, biggestLead int,
    secondChancePoints int, pointsOffTurnovers int, longestRun int,
    min int, GameID int)`;

export const createUserTable: string =
    `CREATE TABLE IF NOT EXISTS users(
    userID int NOT NULL AUTO_INCREMENT, userName varchar(255),
    password varchar(255), firstName varchar(255),
    lastName varchar(255), PRIMARY KEY(userID))`;