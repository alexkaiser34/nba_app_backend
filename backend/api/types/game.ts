export interface Game{
    GameID: number,
    Season: number,
    Status: string,
    Day: string | null,
    DateTime: string | null,
    AwayTeamID: number | null,
    HomeTeamID: number | null,
    HomeTeamScore: number | null,
    AwayTeamScore: number | null
}

export interface Quarter{
    QuarterID: number,
    Number: number,
    GameID: number,
    AwayScore: number,
    HomeScore: number
}

export const templateGame: Game = {
    GameID: 0,
    Season: 0,
    Status: '',
    Day: '',
    DateTime: '',
    AwayTeamID: 0,
    HomeTeamID: 0,
    HomeTeamScore: 0,
    AwayTeamScore: 0
};

export const templateQuarter: Quarter = {
    QuarterID: 0,
    GameID: 0,
    Number: 0,
    AwayScore: 0,
    HomeScore: 0
}