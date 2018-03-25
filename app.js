const express = require('express');
const logger = require('morgan');
const parser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

const router = new express.Router();
app.use('/api', router);

const TeacherController = require('./controllers/TeacherController');
new TeacherController(router);

app.get('/', (req, res) => res.send('Teacher Student REST API Node Assignment'));

module.exports = app;
