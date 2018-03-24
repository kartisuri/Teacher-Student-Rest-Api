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

app.get('/', (req, res) => res.send('Teacher Student REST API Node Assignment'));

app.listen(3010, () => console.log('Example app listening on port', 3010));

module.exports = app;
