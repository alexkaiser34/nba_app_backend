interface Stat{
    StatID: number,
    TeamID: number,
    Season: number,
    Updated: string | null,
    FantasyPoints: number | null,
    FieldGoalsMade: number | null,
    FieldGoalsAttempted: number | null,
    FieldGoalsPercentage: number | null,
    TwoPointersMade: number | null,
    TwoPointersAttempted: number | null,
    TwoPointersPercentage: number | null,
    ThreePointersMade: number | null,
    ThreePointersAttempted: number | null,
    ThreePointersPercentage: number | null,
    FreeThrowsMade: number | null,
    FreeThrowsAttempted: number | null,
    FreeThrowsPercentage: number | null,
    OffensiveRebounds: number | null,
    DefensiveRebounds: number | null,
    Rebounds: number | null,
    Assists: number | null,
    Steals: number | null,
    BlockedShots: number | null,
    Turnovers: number | null,
    PersonalFouls: number | null,
    Points: number | null,
    TrueShootingAttempts: number | null,
    TrueShootingPercentage: number | null,
    FantasyPointsFanDuel: number | null,
    FantasyPointsDraftKings: number | null,
    FantasyPointsYahoo: number | null,
    PlusMinus: number | null
}


interface TeamStat extends Stat{
    Games: number,
    Wins: number,
    Losses: number
}

interface PlayerStat extends Stat{
    PlayerID: number,
    Minutes: number
}

export interface TeamStatSeason extends TeamStat{
    OpponentStat?: TeamStat,
    OpponentStats: string
}

export interface TeamStatGame extends TeamStat{
    DateTime: string,
    HomeOrAway: string,
    IsGameOver: boolean | null,
    GameID: number,
    OpponentID: number
}

export interface PlayerSeasonStat extends PlayerStat{
    Started: number
}

export interface PlayerStatGame extends PlayerStat{
    GameID: number,
    Started: number,
    OpponentID: number,
    FanDuelSalary: number | null,
    DraftKingsSalary: number | null,
    YahooSalary: number | null,
    OpponentRank: number,
    OpponentPositionRank: number,
    IsGameOver: boolean | null,
    DateTime: string | null
}

const templateStat:Stat = {
    StatID: 0,
    TeamID: 0,
    Season: 0,
    Updated: '',
    FantasyPoints: null,
    FieldGoalsMade: null,
    FieldGoalsAttempted: null,
    FieldGoalsPercentage: null,
    TwoPointersMade: null,
    TwoPointersAttempted: null,
    TwoPointersPercentage: null,
    ThreePointersMade: null,
    ThreePointersAttempted: null,
    ThreePointersPercentage:  null,
    FreeThrowsMade: null,
    FreeThrowsAttempted: null,
    FreeThrowsPercentage:  null,
    OffensiveRebounds: null,
    DefensiveRebounds:  null,
    Rebounds: null,
    Assists:  null,
    Steals:  null,
    BlockedShots:  null,
    Turnovers:  null,
    PersonalFouls:  null,
    Points:  null,
    TrueShootingAttempts: null,
    TrueShootingPercentage:  null,
    FantasyPointsFanDuel: null,
    FantasyPointsDraftKings: null,
    FantasyPointsYahoo:  null,
    PlusMinus: null
};

const templateTeamStat:TeamStat = {
    ...templateStat,
    Games: 0,
    Wins: 0,
    Losses: 0
};

const templatePlayerStat:PlayerStat = {
    ...templateStat,
    PlayerID: 0,
    Minutes: 0
};

export const templateTeamSeasonStats:TeamStatSeason = {
    ...templateTeamStat,
    OpponentStat: {
        ...templateTeamStat
    },
    OpponentStats: ''
};

export const templateTeamGameStats:TeamStatGame = {
    ...templateTeamStat,
    DateTime: '',
    HomeOrAway: '',
    IsGameOver: null,
    GameID: 0,
    OpponentID: 0
};

export const templatePlayerSeasonStat:PlayerSeasonStat = {
    ...templatePlayerStat,
    Started: 0
};

/** Started --> 1 = they are starting, 0 = they did not start
 * We can use this instead of making an extra api call for starting lineups
 */
export const templatePlayerGameStat:PlayerStatGame = {
    ...templatePlayerStat,
    GameID: 0,
    Started: 0,
    OpponentID: 0,
    FanDuelSalary: 0,
    DraftKingsSalary: 0,
    YahooSalary: 0,
    OpponentRank: 0,
    OpponentPositionRank: 0,
    IsGameOver: null,
    DateTime: ''
};
