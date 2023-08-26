const axios = require('axios');
const apiParams = require('./config');

function hasNumber(myString) {
    return /\d/.test(myString);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeAPIDuplicates(json_arr){
    for (a in json_arr){
        var dup = 0;
        for (b in json_arr){
            if (json_arr[a].id == json_arr[b].id){
                dup += 1;
                if (dup > 1){
                    break;
                }
            }
        }
        if (dup > 1){
            delete json_arr[a];
        }
    }
}


async function requestMultiplePages(search, endpoint, pageOps){
    var count = 0;
    var done = false;
    var arr = [];

    const isPageOpsDef = typeof pageOps !== 'undefined';

    while (!done){
        const response = await fetch(
            endpoint,
            {
                search: search,
                per_page: !isPageOpsDef ? '100' : pageOps.per_page,
                page:  !isPageOpsDef ? count.toString() : pageOps.number
            }
        );


        arr.push(response);
        if (typeof pageOps === 'undefined'){
            if (response.length != 100){
                done = true;
            }
            else {
                count += 1;
            }

            /** create 1 minute delay every 50 requests */
            if ((count+1) % 50 == 0){
                await sleep(1 * 1000 * 60);
            }

            /** create 30 minute delay every 500 requests.
             * This means a large request is being performed, and we don't
             * want the api to give us an error for too many requests
             */
            if ((count+1) % 500 == 0){
                await sleep(30 * 1000 * 60);
            }
        }
        else{
            break;
        }
    }

    /**flatten array into a bunch of entries, create json object */
    const json_t = JSON.parse(JSON.stringify(arr.flat()));

    /** remove duplicates returned by the API */
    removeAPIDuplicates(json_t);

    return json_t;

}

async function fetch(endpoint){
    try {
      const options = {
        method: apiParams.config.method,
        url: apiParams.config.url + endpoint,
        headers: apiParams.config.headers
      }
      /** if endpoint contains id, response is slightly different, no meta */
      const response = await axios.request(options);
      return JSON.parse(JSON.stringify(response.data));

    } catch (error) {
      console.error(error);
      return error;
    }
}

module.exports = {
    hasNumber,
    sleep,
    removeAPIDuplicates,
    requestMultiplePages,
    fetch
};