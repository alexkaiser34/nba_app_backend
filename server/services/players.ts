import { Player } from "../../backend/api/types/player";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { ConferenceString, DivisionString } from "../types/request";


export async function getPlayersByTeam(teamID: number){
    const rows = await DataBaseActions.retrieveAllByCondition<Player | Player[] | undefined>(
        'players',
        '*',
        `TeamID=${teamID}`
    );
    return rows;
}

export async function getPlayersByConference(conference: ConferenceString){
    const rows = await DataBaseActions.retrieveAllByJoin<Player | Player[] | undefined>(
        'players',
        'players.*',
        'teams',
        'INNER',
        "players.TeamID = teams.TeamID",
        `Conference='${conference}'`
    )
    return rows;
}

export async function getPlayersByDivision(division: DivisionString){
    const rows = await DataBaseActions.retrieveAllByJoin<Player | Player[] | undefined>(
        'players',
        'players.*',
        'teams',
        'INNER',
        "players.TeamID = teams.TeamID",
        `Division='${division}'`
    );
    return rows;
}

