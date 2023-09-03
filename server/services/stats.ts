import { Game, Quarter } from "../../backend/api/types/game";
import { Player } from "../../backend/api/types/player";
import {
    PlayerSeasonStat,
    PlayerStatGame,
    TeamStatGame,
    TeamStatSeason
} from "../../backend/api/types/stats";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";
import { requestID } from "../types/request";


export type allStats =
    TeamStatGame |
    TeamStatSeason |
    PlayerSeasonStat |
    PlayerStatGame;

export interface BoxScore {
    game: Game,
    teams: Team[],
    players: Player[],
    teamGameStats: TeamStatGame,
    quarters: Quarter | Quarter[],
    playerGameStats: PlayerStatGame,
    playerProjectionStats: PlayerStatGame
}

/** For now, make queries from multiple tables so we can separate data
 * into individual objects
 */
export async function getBoxScore(id: requestID){
    const res = {} as BoxScore;

    const tmp = await DataBaseActions.retrieveAllByCondition<Game>(
        'games',
        '*',
        `GameID=${id.id}`
    );

    /** only expect 1 element due to gameID being a unique key */
    res.game = tmp[0];

    res.teams = await DataBaseActions.retrieveAllByCondition<Team>(
        'teams',
        '*',
        `TeamID=${res.game.teams.awayTeamID} OR TeamID=${res.game.teams.homeTeamID}`
    ) as Team[];

    res.players = await DataBaseActions.retrieveAllByCondition<Player>(
        'players',
        '*',
        `TeamID=${res.game.teams.awayTeamID} OR TeamID=${res.game.teams.homeTeamID}`
    ) as Player[];

    res.teamGameStats = await DataBaseActions.retrieveAllByCondition<TeamStatGame>(
        'teamGameStats',
        '*',
        `GameID=${id.id}`
    ) as TeamStatGame;

    res.quarters = await DataBaseActions.retrieveAllByCondition<Quarter>(
        'quarters',
        '*',
        `GameID=${id.id}`
    );

    res.playerGameStats = await DataBaseActions.retrieveAllByCondition<PlayerStatGame>(
        'playersGameStats',
        '*',
        `GameID=${id.id}`
    ) as PlayerStatGame;

    res.playerProjectionStats = await DataBaseActions.retrieveAllByCondition<PlayerStatGame>(
        'playersGameProjectionStats',
        '*',
        `GameID=${id.id}`
    ) as PlayerStatGame;

    return res;
}



