import { Player, templatePlayer } from './types/player';
import { getArray, getArrayMultipleRequests } from './helpers/api_helper';
import { endpoints } from '../config';
import { Team, templateTeam } from './types/team';
import { Game, templateGame, templateQuarter } from './types/game';
import { Standings, templateStandings } from './types/standings';
import { templateTeamSeasonStats,
         templateTeamGameStats,
         PlayerStatGame,
         TeamStatGame,
         TeamStatSeason,
         templatePlayerGameStat
} from './types/stats';

/**
 *  Players needs to fetch from both APIs as data from each is valuable
 * We should only call this function once in a while (maybe once a week)
 * because it preforms 30 out of our 100 daily fetches since it needs
 * to preform one for each team
 *
 * 30 requests
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
 * 1 request
 */
export async function getTeams(): Promise<Team[]>{
    return getArray(templateTeam, endpoints().teams, true);
};

/** 1 request */
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

/** 1 request */
export async function getStandings(year: string): Promise<Standings[]>{
    return getArray(
        templateStandings,
        endpoints().standings_rapid,
        false,
        {
            league: 'standard',
            season: year
        }
    );
}

/** 30 requests */
export async function getTeamSeasonStats(year: string): Promise<TeamStatSeason[]>{
    return getArrayMultipleRequests(
        templateTeamSeasonStats,
        endpoints().teams_season_statistics_rapid,
        false,
        {
            season: year
        }
    );
}
/** requires gameID (max 12 reqs a day)
 * Get all game ids that were on yesterday from games table
 * pass in date YYYY-MM-DD
 */
export async function getTeamGameStats(date: string): Promise<TeamStatGame[]>{
    return getArrayMultipleRequests(
        templateTeamGameStats,
        endpoints().teams_games_statistics_rapid,
        false,
        {
            date: date
        }
    );
}

/** 30 requests */
export async function getPlayerGameStatsByTeam(year: string): Promise <PlayerStatGame[]>{
    return getArrayMultipleRequests(
        templatePlayerGameStat,
        endpoints().players_statistics_rapid,
        false,
        {
            season: year
        }
    )
}

/** max 12 requests */
export async function getPlayerGameStatsByDate(date: string): Promise <PlayerStatGame[]>{
    return getArrayMultipleRequests(
        templatePlayerGameStat,
        endpoints().players_statistics_rapid,
        false,
        {
            date: date
        }
    )
}
