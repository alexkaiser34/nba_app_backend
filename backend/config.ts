export const config = {
    method: 'GET',
    url: 'https://api.sportsdata.io/v3/nba',
    headers: {
        'Ocp-Apim-Subscription-Key': 'c55ad9b60c6d4cef95a36e844d18afbb'
    }
};

export const db_config = {
    host: "awseb-e-hfskuuf3xp-stack-awsebrdsdatabase-58d8rikxnvkg.c6cco9wuqldu.us-east-1.rds.amazonaws.com",
    user: "nbaUser",
    password: "nba_2023",
    database: "ebdb",
    port: 3306
};

export const endpoints = (data?: string) => {
    return {
        players: '/scores/json/Players',
        teams: '/scores/json/teams',

        // data = season (example: 2023)
        schedule: `/scores/json/SchedulesBasic/${data}`,

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