import DataBaseActions from "./classes/DataBaseActions";
import { getUniqueEntries } from "./db_helper";


/**
 * We know the first element in each object is the ID...
 * For now, dont return any promise data as its not entirely useful
 */
export async function updateData<T,>(api_data: T, tableName: string){
    const unique = await getUniqueEntries(api_data, tableName);
    for (const item in unique){
        await DataBaseActions.delete(
            unique[item][Object.keys(unique[item])[0]],
            Object.keys(unique[item])[0],
            tableName);
        await DataBaseActions.save(unique[item], tableName);
    }

}