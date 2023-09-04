interface standingsConference{
    name: string,
    rank: number,
    win: number,
    loss: number
}
interface standingsDivision extends standingsConference{
    gamesBehind: number | null
}

interface standingsStat {
    home: number,
    away: number,
    total: number,
    percentage: number,
    lastTen: number
}
export interface Standings{
    TeamID: number,
    season: number,
    conference: standingsConference,
    division: standingsDivision,
    win: standingsStat,
    loss: standingsStat,
    gamesBehind: number | null,
    streak: number,
    winStreak: boolean,
    tieBreakerPoints: number | null
};

export const templateStandings: Standings = {
    TeamID: 0,
    season: 0,
    conference: {
        name: '',
        rank: 0,
        win: 0,
        loss: 0
    },
    division: {
        name: '',
        rank: 0,
        win: 0,
        loss: 0,
        gamesBehind: 0
    },
    win: {
        home: 0,
        away: 0,
        total: 0,
        percentage: 0,
        lastTen: 0
    },
    loss: {
        home: 0,
        away: 0,
        total: 0,
        percentage: 0,
        lastTen: 0
    },
    gamesBehind: 0,
    streak: 0,
    winStreak: false,
    tieBreakerPoints: 0
};