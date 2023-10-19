const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const challongeRouter = require('./routes/challonge.router')
const tournamentRouter = require('./routes/tournament.router')
const playersRouter = require('./routes/players.router')
const tournamentDetailsRouter = require('./routes/tournamentDetails.router');

const leaderboardRouter = require('./routes/leaderboard.router');
const teamLeaderboardRouter = require('./routes/teamLeaderboard.router');
const searchTeamLeaderboardRouter = require('./routes/searchTeamLeaderboard.router');
const killRouter = require('./routes/kill.router')
const teamsRouter = require('./routes/teams.router')



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/challonge', challongeRouter);
app.use('/api/tournament', tournamentRouter);
app.use('/api/gameview', playersRouter);
app.use('/api/tournamentDetails', tournamentDetailsRouter);

app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/allTeams', teamLeaderboardRouter);
app.use('/api/searchTeam', searchTeamLeaderboardRouter);
app.use('/api/kill', killRouter);
app.use('/api/teams', teamsRouter)




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
