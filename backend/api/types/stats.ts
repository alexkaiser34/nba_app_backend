interface Stat{
    points: number,
    fgm: number,
    fga: number,
    fgp: string,
    ftm: number,
    fta: number,
    ftp: string,
    tpm: number,
    tpa: number,
    tpp: string,
    offReb: number,
    defReb: number,
    totReb: number,
    assists: number,
    pFouls: number,
    steals: number,
    turnovers: number,
    blocks: number,
    plusMinus: string
}

interface TeamStat extends Stat {
    TeamID: number,
    fastBreakPoints: number,
    pointsInPaint: number,
    biggestLead: number,
    secondChancePoints: number,
    pointsOffTurnovers: number,
    longestRun: number
}

export interface PlayerStatGame extends Stat {
    PlayerID: number,
    GameID: number,
    TeamID: number,
    min: string
}

export interface TeamStatGame extends TeamStat {
    min:  string,
    GameID: number
}

export interface TeamStatSeason extends TeamStat {
    games: number,
    season: number
}

const templateStat : Stat = {
    points: 9734,
    fgm: 3656,
    fga: 7682,
    fgp: '64.3',
    ftm: 1515,
    fta: 1863,
    ftp: '81.3',
    tpm: 907,
    tpa: 2593,
    tpp: '35.1',
    offReb: 943,
    defReb: 2794,
    totReb: 3737,
    assists: 2059,
    pFouls: 1556,
    steals: 583,
    turnovers: 1075,
    blocks: 411,
    plusMinus: ''
};

const templateTeamStat:TeamStat = {
    ...templateStat,
    fastBreakPoints: 0,
    pointsInPaint: 0,
    biggestLead: 0,
    secondChancePoints: 0,
    pointsOffTurnovers: 0,
    longestRun: 0,
    TeamID: 0
};

export const templatePlayerGameStat:PlayerStatGame = {
    ...templateStat,
    PlayerID: 0,
    TeamID: 0,
    GameID: 0,
    min: ''
};

export const templateTeamSeasonStats:TeamStatSeason = {
    ...templateTeamStat,
    games: 0,
    season: 0
};

export const templateTeamGameStats:TeamStatGame = {
    ...templateTeamStat,
    min: '',
    GameID: 0
};
