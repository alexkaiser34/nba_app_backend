const axios = require('axios');
const apiParams = require('./config');

function hasNumber(myString) {
  return /\d/.test(myString);
}

async function fetch(endpoint, query_params){
  try {
    const options = {
      method: apiParams.config.method,
      url: apiParams.config.url + endpoint,
      headers: apiParams.config.headers,
      params: query_params
    }
    /** if endpoint contains id, response is slightly different, no meta */
    const response = await axios.request(options);
    const resp_json = await hasNumber(endpoint) ? JSON.stringify(response.data) : JSON.stringify(response.data.data);
    return JSON.parse(resp_json);

  } catch (error) {
    console.error(error);
    return error;
  }
}

async function test(){
  const result = await fetch(apiParams.endpoints().players, {
    page: '0',
    per_page: '25',
    search: 'James'
  });

  console.log(result);

}


test();


module.exports = {
    fetch
}