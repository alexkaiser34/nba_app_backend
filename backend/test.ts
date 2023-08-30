import { getBoxScores, getPlayerProjectionsSeason, getPlayers, getPlayerStatsSeason, getSchedule, getStandings, getTeams, getTeamSeasonStats } from "./api/api_endpoints";
import { formatInsertValues, getUniqueEntries } from "./db/db_helper";
import DataBaseActions from "./db/classes/DataBaseActions";
import { createGamesTable, createPlayersGameProjectionsTable, createPlayersGameStatsTable, createPlayersSeasonProjectionsTable, createPlayersSeasonStatsTable, createPlayerTable, createQuartersTable, createStandingsTable, createTeamGameStatsTable, createTeamSeasonStatsTable, createTeamTable, createUserTable } from "./db/queries/tableQueries";
import { Player } from "./api/types/player";
import { updateData } from "./db/db_ops";

async function test(){
    const result = await getPlayers();
    await updateData(result, 'players');
}

test();