import { Standings } from "../../backend/api/types/standings";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";

export async function getSeasonStanding(
    season: number,
    data?: string,
    filterBy?: keyof Team
    ): Promise<(Team & Standings)[]>{
        return new Promise<(Team & Standings)[]>((resolve, reject) => {
            var cond = `Season=${season}`;

            if (filterBy !== undefined){
                cond += ` AND teams.${filterBy as string}='${data}'`;
            }
            DataBaseActions.retrieveAllByJoin<Team>(
                'teams',
                '*',
                'standings',
                'INNER',
                'teams.TeamID = standings.TeamID',
                cond
            )
            .then((res) => resolve(res as (Team & Standings)[]))
            .catch((err) => reject(err))
        });
}