import { Player, templatePlayer } from './types/player';
import { getArray } from './helpers/api_helper';
import { endpoints } from '../config';
import { Team, templateTeam } from './types/team';
import { Game, templateGame, templateQuarter } from './types/game';
import { Standings, templateStandings } from './types/standings';
import { templateTeamSeasonStats,
         templateTeamGameStats,
         PlayerStatGame,
         templatePlayerGameStat,
         TeamStatGame,
         TeamStatSeason
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
    return getArray(
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
 */
export async function getTeamGameStats(): Promise<TeamStatGame[]>{
    return getArray(
        templateTeamGameStats,
        endpoints().teams_games_statistics_rapid,
        false
        // need to gather array of gameIDs
    );
}

/** 30 requests */
export async function getPlayerGameStatsByTeam(year: string): Promise <PlayerStatGame[]>{
    return getArray(
        templatePlayerGameStat,
        endpoints().players_statistics_per_team_rapid,
        false,
        {
            season: year
        }
        // need to gather array of teamIDs
    )
}
