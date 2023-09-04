import { Standings } from "../../backend/api/types/standings";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { requestSeason } from "../types/request";

export async function getSeasonStanding(
    season: requestSeason,
    filterBy?: keyof Team
    ): Promise<(Team & Standings)[]>{
        return new Promise<(Team & Standings)[]>((resolve, reject) => {
            const fields = season.fields === undefined ? '*' : season.fields.replace('TeamID', 'teams.TeamID');
            var cond = `Season=${season.season}`;

            if (filterBy !== undefined){
                if (season.fieldValue !== undefined){
                    cond += ` AND teams.${filterBy as string}='${season.fieldValue}'`;
                }
                else {
                    reject({"message": `Must specify "fieldValue":"value" to seek for ${filterBy as string}`});
                    return;
                }
            }
            DataBaseActions.retrieveAllByJoin<Team>(
                'teams',
                fields,
                'standings',
                'INNER',
                'teams.TeamID = standings.TeamID',
                cond
            )
            .then((res) => resolve(res as (Team & Standings)[]))
            .catch((err) => reject(err))
        });
}