const config = {
    method: 'GET',
    url: 'https://api.sportsdata.io/v3/nba',
    headers: {
        'Ocp-Apim-Subscription-Key': 'b6a392907426420f9fbb33c5bd171ebb'
    }
};

const db_config = {
    db: {
        host: "localhost",
        user: "nba_user",
        password: "nba_2023",
        database: "nba_data"
    },
    listPerPage: 10,
};

const endpoints = (data) => {
    return {
        players: '/scores/json/Players',
        teams: '/scores/json/teams',

        // data = season (example: 2023)
        schedule: `/scores/json/Games/${data}`,

        // data = season (example: 2023)
        standings: `/scores/json/Standings/${data}`,

        // data = date (example: 2018-OCT-31)
        teamGameStatsByDate: `/scores/json/TeamGameStatsByDate/${data}`,

        // data = season (example: 2023)
        teamSeasonStats: `/scores/json/TeamSeasonStats/${data}`,

        // data = date (example: 2018-OCT-31)
        playerProjectionsByDate: `/projections/json/PlayerGameProjectionStatsByDate/${data}`,

        // data = season (example: 2023)
        playerSeasonProjections: `/projections/json/PlayerSeasonProjectionStats/${data}`,

        // data = date (example: 2018-OCT-31)
        boxScoresByDate: `/stats/json/BoxScores/${data}`,

        // data = date (example: 2018-OCT-31)
        // NOTE: prob dont need, seems like box score has this already
        playerGameStatsByDate: `/stats/json/PlayerGameStatsByDate/${data}`,

        // data = season (example: 2023)
        playerSeasonStats: `/stats/json/PlayerSeasonStats/${data}`
    };
};

module.exports = { config, db_config, endpoints};