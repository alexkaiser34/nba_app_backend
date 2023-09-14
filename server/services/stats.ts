import { Game, Quarter } from "../../backend/api/types/game";
import { Player } from "../../backend/api/types/player";
import {
    PlayerStatGame,
    TeamStatGame,
    TeamStatSeason
} from "../../backend/api/types/stats";
import { Team } from "../../backend/api/types/team";
import DataBaseActions from "../../backend/db/classes/DataBaseActions";

export type allStats =
    TeamStatGame |
    TeamStatSeason |
    PlayerStatGame;

export interface BoxScore {
    game: Game,
    teams: Team[],
    players: Player[],
    teamGameStats: TeamStatGame,
    playerGameStats: PlayerStatGame
}

/** For now, make queries from multiple tables so we can separate data
 * into individual objects
 */
export async function getBoxScore(id: number){
    const res = {} as BoxScore;

    const tmp = await DataBaseActions.retrieveAllByCondition<Game>(
        'games',
        '*',
        `id=${id}`
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
        `GameID=${id}`
    ) as TeamStatGame;

    res.playerGameStats = await DataBaseActions.retrieveAllByCondition<PlayerStatGame>(
        'playersGameStats',
        '*',
        `GameID=${id}`
    ) as PlayerStatGame;


    return res;
}



