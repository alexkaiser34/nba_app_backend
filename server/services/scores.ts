import { Game } from "../../backend/api/types/game";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { requestID } from "../types/request";

type teamScore = (Game & Team)[];

export async function getTeamScores(team: requestID):Promise<teamScore>{
    return new Promise<teamScore>((resolve, reject) => {
        const fields = team.fields === undefined ? 'games.*' : team.fields;
        DataBaseActions.retrieveAllByJoin<teamScore>(
            'games',
            fields,
            'teams',
            'INNER',
            "teams.TeamID = games.AwayTeamID OR teams.TeamID = games.HomeTeamID",
            `TeamID=${team.id}`
        )
        .then((res) => resolve(res as teamScore))
        .catch((err) => reject(err));
    })

}