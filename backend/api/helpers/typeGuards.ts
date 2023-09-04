import { Game, Quarter } from "../types/game";
import { Player } from "../types/player";
import { Standings } from "../types/standings";
import { PlayerStatGame, TeamStatGame, TeamStatSeason } from "../types/stats";
import { Team } from "../types/team";



export function isPlayer(object: any): object is Player {
    return 'College' in object;
}

export function isPlayerStatGame(object: any): object is PlayerStatGame {
    return 'PlayerID' in object;
}

export function isTeamStatGame(object: any): object is TeamStatGame {
    return 'min' in object;
}

export function isStanding(object: any): object is Standings {
    return 'gamesBehind' in object;
}

export function isTeam(object: any): object is Team {
    return 'HeadCoach' in object;
}

export function isTeamSeasonStats(object: any): object is TeamStatSeason {
    return 'games' in object;
}

export function isGame(object: any): object is Game {
    return 'timesTied' in object;
}