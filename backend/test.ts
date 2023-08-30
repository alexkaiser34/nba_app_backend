import { dailyUpdate } from "./db/db_ops";

async function test(){
    await dailyUpdate();
}

test();