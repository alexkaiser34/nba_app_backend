# NBA Application Backend
The backend uses nodejs with express and mysql to make requests to an <a href="https://rapidapi.com/theapiguy/api/free-nba/details">external API</a> and write the results to a mySQL database.

## Prerequisites
- <a href="https://www.javatpoint.com/how-to-install-mysql">MySQL</a>
- <a href="https://nodejs.org/en">nodejs</a>

## Initializing MySQL
This application uses a constant user that has access to a mySQL server
running on your local host.  Run the following commands initially to create the user in mySQL.
```
mysql -u root -p
CREATE USER 'nba_user'@'localhost' IDENTIFIED BY 'nba_2023';
CREATE DATABASE nba_data;
GRANT ALL PRIVILEGES ON nba_data.* TO 'nba_user'@'localhost' WITH GRANT OPTION;
```

## Running Backend

Run `npm start` from root of project to launch express server and backend.