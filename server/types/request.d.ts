export type requestID = {
    id: number,
    fields?: string
};

export type requestSeason = {
    season: number,
    fieldValue?: string,
    fields?: string
};

export type requestByString = {
    fieldValue: string,
    fields?: string
}

export type requestAll = {
    fields?: string
}