import { Player, templatePlayer } from './types/player';
import { fetch, getArray } from './helpers/api_helper';
import { endpoints } from '../config';
import { Team, templateTeam } from './types/team';
import { Game, Quarter, templateGame, templateQuarter } from './types/game';
import { Standings, templateStandings } from './types/standings';
import { templateTeamSeasonStats,
         templateTeamGameStats,
         PlayerStatGame,
         templatePlayerGameStat,
         PlayerSeasonStat,
         templatePlayerSeasonStat,
         TeamStatGame,
         TeamStatSeason
} from './types/stats';

/**
 *  Players needs to fetch from both APIs as data from each is valuable
 * We should only call this function once in a while (maybe once a week)
 * because it preforms 30 out of our 100 daily fetches since it needs
 * to preform one for each team
 */
export async function getPlayers(year: string): Promise<Player[]>{
    return getArray(
        templatePlayer,
        endpoints().players,
        true,
        {
            season: year
        }
    );
};

/**
 * Teams need to call both APIs as data from each is valuable
 */
export async function getTeams(): Promise<Team[]>{
    return getArray(templateTeam, endpoints().teams, true);
};

export async function getSchedule(year: string): Promise<Game[]>{
    return getArray(
        templateGame,
        endpoints().games_rapid,
        false,
        {
            season: year
        }
    );
}

export async function getStandings(year: string): Promise<Standings[]>{
    return getArray(templateStandings, endpoints(year).standings, true);
}

export async function getTeamStatsByDate(date: string): Promise<TeamStatGame[]>{
    return getArray(templateTeamGameStats, endpoints(date).teamGameStatsByDate, true);
}

export async function getTeamSeasonStats(year: string): Promise<TeamStatSeason[]>{
    return getArray(templateTeamSeasonStats, endpoints(year).teamSeasonStats, true);
}

export async function getBoxScores(date: string): Promise<Quarter[]>{
    return getArray(templateQuarter, endpoints(date).boxScoresByDate, true);
}

export async function getPlayerStatsByDate(date: string):Promise<PlayerStatGame[]>{
    return getArray(templatePlayerGameStat, endpoints(date).playerGameStatsByDate, true);
}

export async function getPlayerStatsSeason(year:string):Promise<PlayerSeasonStat[]>{
    return getArray(templatePlayerSeasonStat, endpoints(year).playerSeasonStats, true);
}

export async function getPlayerProjectionsByDate(date: string):Promise<PlayerStatGame[]>{
    return getArray(templatePlayerGameStat, endpoints(date).playerProjectionsByDate, true);
}

export async function getPlayerProjectionsSeason(year:string):Promise<PlayerSeasonStat[]>{
    return getArray(templatePlayerSeasonStat, endpoints(year).playerSeasonProjections, true);
}
