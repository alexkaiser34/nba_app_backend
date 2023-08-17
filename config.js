const config = {
    method: 'GET',
    url: 'https://free-nba.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '74a26f4db2mshcfb2437a46108e4p1fa45ajsna8c07b3ea2b9',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    },
    default_params: {
        page: '0',
        per_page: '25',
        search: 'James'
    }
};

const endpoints = (id) => {
    return {
        players: '/players',
        specificPlayer: `/players/${id}`,
        teams: '/teams',
        specificTeam: `/teams/${id}`,
        games: '/games',
        specificGame: `/games/${id}`,
        stats: '/stats'
    };
};

module.exports = {
    config,
    endpoints
};