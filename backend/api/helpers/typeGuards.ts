import { Game, Quarter } from "../types/game";
import { Player } from "../types/player";
import { TeamStatSeason } from "../types/stats";
import { Team } from "../types/team";



export function isPlayer(object: any): object is Player {
    return 'College' in object;
}

export function isTeam(object: any): object is Team {
    return 'HeadCoach' in object;
}

export function isTeamSeasonStats(object: any): object is TeamStatSeason {
    return 'OpponentStat' in object;
}

export function isQuarter(object: any): object is Quarter {
    return 'QuarterID' in object;
}

export function isGame(object: any): object is Game {
    return 'timesTied' in object;
}