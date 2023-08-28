import * as endpoints from './api/api_endpoints';

async function test(){
    const result = await endpoints.getPlayerProjectionsSeason('2024');
    console.log(result);
}

test();