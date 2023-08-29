import { getBoxScores, getPlayerProjectionsSeason, getPlayers, getPlayerStatsSeason, getSchedule, getStandings, getTeams, getTeamSeasonStats } from "./api/api_endpoints";
import { formatInsertValues } from "./db/db_helper";
import DataBaseActions from "./db/classes/DataBaseActions";
import { createGamesTable, createPlayersGameProjectionsTable, createPlayersGameStatsTable, createPlayersSeasonProjectionsTable, createPlayersSeasonStatsTable, createPlayerTable, createQuartersTable, createStandingsTable, createTeamGameStatsTable, createTeamSeasonStatsTable, createTeamTable, createUserTable } from "./db/queries/tableQueries";

async function test(){
    const res = await getPlayerProjectionsSeason('2024');
    const result = await DataBaseActions.save(res, 'playersSeasonProjectionStats');
    console.log(result);
}

test();