import { Player, templatePlayer } from './types/player';
import { getArray } from './api_helper';
import { endpoints } from '../config';
import { Team, templateTeam } from './types/team';
import { BoxScore, Game, templateBoxScore, templateGame } from './types/game';
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
 *  Get a list of players from the API
 *s
 * @returns Array of players
 */
export async function getPlayers(): Promise<Player[]>{
    return getArray(templatePlayer, endpoints().players);
};

export async function getTeams(): Promise<Team[]>{
    return getArray(templateTeam, endpoints().teams);
};

export async function getSchedule(year: string): Promise<Game[]>{
    return getArray(templateGame, endpoints(year).schedule);
}

export async function getStandings(year: string): Promise<Standings[]>{
    return getArray(templateStandings, endpoints(year).standings);
}

export async function getTeamStatsByDate(date: string): Promise<TeamStatGame[]>{
    return getArray(templateTeamGameStats, endpoints(date).teamGameStatsByDate);
}

export async function getTeamSeasonStats(year: string): Promise<TeamStatSeason[]>{
    return getArray(templateTeamSeasonStats, endpoints(year).teamSeasonStats);
}

export async function getBoxScores(date: string): Promise<BoxScore[]>{
    return getArray(templateBoxScore, endpoints(date).boxScoresByDate);
}

export async function getPlayerStatsByDate(date: string):Promise<PlayerStatGame[]>{
    return getArray(templatePlayerGameStat, endpoints(date).playerGameStatsByDate);
}

export async function getPlayerStatsSeason(year:string):Promise<PlayerSeasonStat[]>{
    return getArray(templatePlayerSeasonStat, endpoints(year).playerSeasonStats);
}

export async function getPlayerProjectionsByDate(date: string):Promise<PlayerStatGame[]>{
    return getArray(templatePlayerGameStat, endpoints(date).playerProjectionsByDate);
}

export async function getPlayerProjectionsSeason(year:string):Promise<PlayerSeasonStat[]>{
    return getArray(templatePlayerSeasonStat, endpoints(year).playerSeasonProjections);
}
