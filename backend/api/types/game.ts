export interface gameDate {
    start: string,
    end: string,
    duration: string
}

export interface gamesStatus {
    clock: number | string,
    halftime: boolean,
    short: number,
    long: string
}

export interface gamesArena {
    name: string | null,
    city: string | null,
    state: string | null,
    country: string | null

}

export interface gamesTeams {
    awayTeamID: number,
    homeTeamID: number
}

export interface scoreSeries {
    win: number,
    loss: number
}

export interface scoreData {
    win: number,
    loss: number,
    series: scoreSeries,
    lineScore: number[] | string[],
    points: number
}

export interface gamesScores {
    visitors: scoreData,
    home: scoreData
}

export interface Game{
    id: number,
    season: number,
    date: gameDate,
    status: gamesStatus,
    arena: gamesArena,
    teams: gamesTeams,
    scores: gamesScores,
    timesTied: number,
    leadChanges: number
}

export interface Quarter{
    QuarterID: number,
    Number: number,
    GameID: number,
    AwayScore: number,
    HomeScore: number
}

export const templateGame: Game = {
    id: 0,
    season: 0,
    date: {
        start: '',
        end: '',
        duration: ''
    },
    status: {
        clock: null,
        halftime: false,
        short: 0,
        long: ''
    },
    arena: {
        name: '',
        city: '',
        state: '',
        country: ''
    },
    teams: {
        awayTeamID: 0,
        homeTeamID: 0
    },
    scores: {
        visitors: {
            win: 0,
            loss: 0,
            series: {
                win: 0,
                loss: 0
            },
            lineScore: [],
            points: 0
        },
        home: {
            win: 0,
            loss: 0,
            series: {
                win: 0,
                loss: 0
            },
            lineScore: [],
            points: 0
        }
    },
    timesTied: 0,
    leadChanges: 0
};

export const templateQuarter: Quarter = {
    QuarterID: 0,
    GameID: 0,
    Number: 0,
    AwayScore: 0,
    HomeScore: 0
}