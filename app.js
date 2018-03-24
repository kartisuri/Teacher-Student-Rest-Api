const express = require('express');
const parser = require('body-parser');
const config = require('./config/config');

const app = express();
const router = new express.Router();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use('/api', router);

const TeacherController = require('./controllers/TeacherController');
let tc = new TeacherController(router);
let initDb = require('./db_init');

app.get('/', (req, res) => res.send('Teacher Student REST API Node Assignment'));

app.listen(config.port, () => console.log('Example app listening on port', config.port));

module.exports = app;
