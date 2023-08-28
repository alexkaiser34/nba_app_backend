export interface Player {
    PlayerID: number,
    Status: string | null,
    TeamID: number,
    Jersey: number,
    Position: string,
    FirstName: string,
    LastName: string,
    Height: number | null,
    Weight: number | null,
    BirthDate: string | null,
    BirthCity: string | null,
    BirthState: string | null,
    BirthCountry: string | null,
    College: string | null,
    Salary: number | null,
    Experience: number | null,
    FanDuelPlayerID: number | null,
    DraftKingsPlayerID: number | null,
    NbaDotComPlayerID: number | null,
    Headshot: string | null
};

export const templatePlayer: Player = {
    PlayerID: 0,
    Status: null,
    TeamID: 0,
    Jersey: 0,
    Position: '',
    FirstName: '',
    LastName: '',
    Height: null,
    Weight: null,
    BirthDate: null,
    BirthCity: null,
    BirthState: null,
    BirthCountry: null,
    College: null,
    Salary: null,
    Experience: null,
    FanDuelPlayerID: null,
    DraftKingsPlayerID: null,
    NbaDotComPlayerID: null,
    Headshot: null
}

export const HeadshotUrl = (id:string | number):string => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`;
};

export const BlankUrl:string = 'https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nba/low-res/0.png';