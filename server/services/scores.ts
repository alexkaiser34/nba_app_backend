import { Game } from "../../backend/api/types/game";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";

type teamScore = (Game & Team)[];

export async function getTeamScores(team: number):Promise<teamScore>{
    return new Promise<teamScore>((resolve, reject) => {
        DataBaseActions.retrieveAllByJoin<teamScore>(
            'games',
            'games.*',
            'teams',
            'INNER',
            "teams.TeamID = JSON_EXTRACT(games.teams, '$.awayTeamID') OR teams.TeamID = JSON_EXTRACT(games.teams, '$.homeTeamID')",
            `TeamID=${team}`
        )
        .then((res) => resolve(res as teamScore))
        .catch((err) => reject(err));
    })

}