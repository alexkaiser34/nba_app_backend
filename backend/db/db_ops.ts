import { conforms } from "lodash";
import { getBoxScores, getPlayerProjectionsByDate, getPlayerProjectionsSeason, getPlayers, getPlayerStatsByDate, getPlayerStatsSeason, getSchedule, getStandings, getTeams, getTeamSeasonStats, getTeamStatsByDate } from "../api/api_endpoints";
import DataBaseActions from "./classes/DataBaseActions";
import { getUniqueEntries } from "./db_helper";


/**
 * We know the first element in each object is the ID...
 * For now, dont return any promise data as its not entirely useful
 */
export async function updateData<T,>(api_data: T, tableName: string){
    const unique = await getUniqueEntries(api_data, tableName);

    const dbEntries = await DataBaseActions.retrieveAll<T>(tableName);
    let id_arr: number[] = [];
    dbEntries.forEach((entry) => {
        id_arr.push(entry[Object.keys(entry)[0]])
    });

    for (const item in unique){

        let needsUpdate = false;
        if (id_arr.includes(unique[item][Object.keys(unique[item])[0]])){
            needsUpdate = true;
        }

        if (needsUpdate){
            await DataBaseActions.update(
                unique[item] as T,
                Object.keys(unique[item])[0],
                tableName
            );
        }
        else {
            await DataBaseActions.save(unique[item], tableName);
        }
    }
}

function getMonthStr(month: number):string{
    var s:string = '';
    switch(month){
        case 1:
            s = 'JAN';
            break;
        case 2:
            s = 'FEB';
            break;
        case 3:
            s = 'MAR';
            break;
        case 4:
            s = 'APR';
            break;
        case 5:
            s = 'MAY';
            break;
        case 6:
            s = 'JUN';
            break;
        case 7:
            s = 'JUL';
            break;
        case 8:
            s = 'AUG';
            break;
        case 9:
            s = 'SEP';
            break;
        case 10:
            s = 'OCT';
            break;
        case 11:
            s = 'NOV';
            break;
        case 12:
            s = 'DEC';
            break;
        default:
            break;
    }
    return s;
}

async function apiToDB(tableName:string,fnc: any, params?:string){
    const result = await fnc(params);
    console.log('updating....' + tableName);
    await updateData(result, tableName);
}

export async function dailyUpdate(){
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = getMonthStr(currentTime.getMonth() + 1);
    const day = currentTime.getDate().toString();
    const date_string = `${year}-${month}-${day}`;

    /** Players */
    await apiToDB('players', getPlayers);

    /** Teams */
    await apiToDB('teams', getTeams);

    /** Schedule */
    await apiToDB('games', getSchedule, year);

    /** Standings */
    await apiToDB('standings', getStandings, year);

    /** Team game stats */
    await apiToDB('teamGameStats', getTeamStatsByDate, date_string);

    /** Team Season stats */
    await apiToDB('teamSeasonStats', getTeamSeasonStats, year);

    /** Quarter stats */
    await apiToDB('quarters', getBoxScores, date_string);

    /** Player game stats */
    await apiToDB('playersGameStats', getPlayerStatsByDate, date_string);

    /** Player season stats */
    await apiToDB('playersSeasonStats', getPlayerStatsSeason, year);

    /** Player game projections */
    await apiToDB('playersGameProjectionStats', getPlayerProjectionsByDate, date_string);

    /** Player season projections */
    await apiToDB('playersSeasonProjectionStats', getPlayerProjectionsSeason, year);

}