import express from 'express';
import morgan from 'morgan';
import hbs_sections from 'express-handlebars-sections';
import asyncError from 'express-async-errors';

import activate_view_middleware from './middlewares/view.mdw.js';
import activate_route_middleware from './middlewares/routes.mdw.js';
// var bodyParser = require('body-parser')

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));

app.use('/public',express.static('public'));

activate_view_middleware(app);
activate_route_middleware(app);


app.set('port',process.env.PORT || '3000');
app.listen(app.get('port'), function () {
  console.log(`Example app listening at http://localhost:${app.get('port')}`);
});
