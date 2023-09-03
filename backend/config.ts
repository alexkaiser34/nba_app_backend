export const api_config = {
    sportsData_api: {
        method: 'GET',
        url: 'https://api.sportsdata.io/v3/nba',
        headers: {
            'Ocp-Apim-Subscription-Key': 'c55ad9b60c6d4cef95a36e844d18afbb'
        }
    },
    rapid_api: {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com',
        headers: {
            'X-RapidAPI-Key': 'dfeeacc06emshe5a24d5bbe8fc46p159a5cjsn1e6f59dc0a67',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
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
        playerSeasonStats: `/stats/json/PlayerSeasonStats/${data}`,

        // gamesPerSeason
        // params: { season : '<season>'}
        games_rapid: '/games',

        // all teams (no params)
        teams_rapid: '/teams',

        // players per team and season
        // params: { team: '<number>', season: '<season>'}
        players_rapid: '/players',

        // standings for season
        // params: { league: 'standard', season: '<season>'}
        standings_rapid: '/standings',

        // overall team stats for a season
        // params: { id: '<team number>', season: '<season>'}
        teams_season_statistics_rapid: '/teams/statistics',

        // team stats of game
        // params: {id: '<game ID>}
        teams_games_statistics_rapid: '/games/statistics',

        // stats of players by team
        // params: {team: '<team number>', season: '<season>'}
        players_statistics_per_team: '/players/stastics'


    };
};