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
        // provides game stats too
        // params: {team: '<team number>', season: '<season>'}
        // params: {game: gameID} --> for individual game
        players_statistics_rapid: '/players/statistics'


    };
};