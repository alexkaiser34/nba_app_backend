import { getGameIDs } from "../../backend/api/helpers/json_helper";
import { BoxScore, getBoxScore } from "./stats";


export async function getCurrentBoxScores(){
    const currentTime = new Date();
    const year =currentTime.getFullYear().toString();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate().toString();
    const date_string = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    const tmp = '2023-04-03';
    const gameIDs = await getGameIDs(tmp);

    var boxScores: BoxScore[] = [];
    for (const id in gameIDs){
        boxScores.push(await getBoxScore({id: gameIDs[id]}));
    }

    return boxScores;
}