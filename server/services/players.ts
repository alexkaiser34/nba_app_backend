import { Player } from "../../backend/api/types/player";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { requestAll, requestByString, requestID } from "../types/request";


export async function getPlayersByTeam(teamID: requestID){
    const rows = await DataBaseActions.retrieveAllByCondition<Player | Player[] | undefined>(
        'players',
        teamID.fields === undefined ? '*' : teamID.fields,
        `TeamID=${teamID.id}`
    );
    return rows;
}

export async function getPlayersByConference(conference: requestByString){
    const fields = conference.fields === undefined ? 'players.*' :
        conference.fields.replace('TeamID', 'players.TeamID');
    const rows = await DataBaseActions.retrieveAllByJoin<Player | Player[] | undefined>(
        'players',
        fields,
        'teams',
        'INNER',
        "players.TeamID = teams.TeamID",
        `Conference='${conference.fieldValue}'`
    )
    return rows;
}

export async function getPlayersByDivision(division: requestByString){
    const fields = division.fields === undefined ? 'players.*' :
        division.fields.replace('TeamID', 'players.TeamID');
    const rows = await DataBaseActions.retrieveAllByJoin<Player | Player[] | undefined>(
        'players',
        fields,
        'teams',
        'INNER',
        "players.TeamID = teams.TeamID",
        `Division='${division.fieldValue}'`
    );
    return rows;
}

