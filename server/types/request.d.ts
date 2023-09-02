import { tableNames } from "../../backend/db/queries/tableQueries";

export type requestID = {
    id: number,
    tablename?: tableNames,
    fields?: string
};

export type requestSeason = {
    season: number,
    fieldValue?: string,
    fields?: string
};

export type requestByCondition = {
    conditions: string,
    fields?: string
};

export type requestByString = {
    fieldValue: string,
    fields?: string
}

export type requestAll = {
    fields?: string
}