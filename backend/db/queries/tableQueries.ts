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
    TeamID int, Season int, Wins int, Losses int, Percentage float,
    ConferenceWins int, ConferenceLosses int, DivisionWins int, DivisionLosses int,
    HomeWins int, HomeLosses int, AwayWins int, AwayLosses int, LastTenWins int,
    LastTenLosses int, PointsPerGameFor float, PointsPerGameAgainst float, Streak int,
    GamesBack int, ConferenceRank int, DivisionRank int)`;

export const createGamesTable: string =
    `CREATE TABLE IF NOT EXISTS games(
    GameID int, Season int, Status varchar(255), Day varchar(255), DateTime varchar(255),
    AwayTeamID int, HomeTeamID int, Attendance int, HomeTeamScore int,
    AwayTeamScore int, PointSpread float, OverUnder float,
    UNIQUE(GameID))`;

export const createQuartersTable: string =
    `CREATE TABLE IF NOT EXISTS quarters(
    GameID int, Number int, QuarterID int,
    AwayScore int, HomeScore int,
    UNIQUE(QuarterID))`;

export const createPlayersSeasonStatsTable: string =
    `CREATE TABLE IF NOT EXISTS playersSeasonStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int, PlayerID int,
    Minutes int, Started int,
    UNIQUE(StatID))`;

export const createPlayersGameStatsTable: string =
    `CREATE TABLE IF NOT EXISTS playersGameStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int, PlayerID int,
    Minutes int, Started int, GameID int, OpponentID int, FanDuelSalary float, DraftKingsSalary float, YahooSalary float,
    OpponentRank int, OpponentPositionRank int, IsGameOver boolean, DateTime varchar(255),
    UNIQUE(StatID))`;

export const createTeamSeasonStatsTable: string =
    `CREATE TABLE IF NOT EXISTS teamSeasonStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int,
    Games int, Wins int, Losses int,
    OpponentStats JSON,
    UNIQUE(StatID))`;

export const createTeamGameStatsTable: string =
    `CREATE TABLE IF NOT EXISTS teamGameStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int,
    DateTime varchar(255), HomeOrAway varchar(255), IsGameOver boolean, GameID int, OpponentID int,
    Games int, Wins int, Losses int,
    UNIQUE(StatID))`;

export const createPlayersGameProjectionsTable: string =
    `CREATE TABLE IF NOT EXISTS playersGameProjectionStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int, PlayerID int,
    Minutes int, Started int, GameID int, OpponentID int, FanDuelSalary float, DraftKingsSalary float, YahooSalary float,
    OpponentRank int, OpponentPositionRank int, IsGameOver boolean, DateTime varchar(255),
    UNIQUE(StatID))`;


export const createPlayersSeasonProjectionsTable: string =
    `CREATE TABLE IF NOT EXISTS playersSeasonProjectionStats(
    StatID int, TeamID int, Season int, Updated varchar(255), FantasyPoints int,
    FieldGoalsMade int, FieldGoalsAttempted int, FieldGoalsPercentage float, TwoPointersMade int,
    TwoPointersAttempted int, TwoPointersPercentage float, ThreePointersMade int, ThreePointersAttempted int,
    ThreePointersPercentage float, FreeThrowsMade int, FreeThrowsAttempted int, FreeThrowsPercentage float,
    OffensiveRebounds int, DefensiveRebounds int, Rebounds int, Assists int, Steals int, BlockedShots int,
    Turnovers int, PersonalFouls int, Points int, TrueShootingAttempts int, TrueShootingPercentage float,
    FantasyPointsFanduel float, FantasyPointsDraftKings float, FantasyPointsYahoo float, PlusMinus int, PlayerID int,
    Minutes int, Started int,
    UNIQUE(StatID))`;

export const createUserTable: string =
    `CREATE TABLE IF NOT EXISTS users(
        userID int NOT NULL AUTO_INCREMENT, userName varchar(255),
        password varchar(255), firstName varchar(255),
        lastName varchar(255), PRIMARY KEY(userID))`;