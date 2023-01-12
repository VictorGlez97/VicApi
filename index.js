const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

console.log(`listen on port ${port}`);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

//var dbConn = require('./config/db/config');

// const UserRoutes = require('./src/routes/User.router');

app.use('/api/user', require('./src/routes/User.router'));

// app.use('/api/project', require('./src/routes/Project.router'));

app.use('/api/team', require('./src/routes/Team.router'));

app.use('/api/game', require('./src/routes/Game.router'));

app.use('/api/bill', require('./src/routes/Bill.router'));

app.use('/api/catalog', require('./src/routes/Catalog.router'));

app.use('/api/bank', require('./src/routes/Bank.router'));

app.use('/api/gambles', require('./src/routes/Gamble.router'));

// routes.initialize(app);

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
