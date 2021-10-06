/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// const fetchData = require('./fetch-data');

const port = 3000;
const app = express();
const pwd = __dirname.split(path.sep);
pwd.pop();
const statics = `${pwd.join(path.sep)}/build/static`;
const assets = `${pwd.join(path.sep)}/build/assets`;

app.use('/static', express.static(statics));
app.use('/assets', express.static(assets));

const hbs = exphbs.create({
  helpers: {
    escapeJS: ( data ) => {
      return JSON.stringify( data );
    }
  },
  extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.enable('view cache');
app.locals.layout = false;

const commonIndex = (req, res) => {
  return res.render('index', {
    seo: {
      title: 'Social Events Platform',
      og_title: 'Social Events Platform',
      og_description: 'Social Events Platform',
      img_og_picture: '/assets/seo.png',
      og_site_name: 'Social Events Platform',
      url: '/',
      keywords: 'Social,Events'
    }
  });
};

app.get('/badge/:badgetId/check-in', commonIndex);
app.get('/badge/:badgetId', commonIndex);
app.get('/:eventId', commonIndex);
app.get('/', commonIndex);

app.listen(port, () => {
  console.log(`API URL: ${process.env.REACT_APP_API_URL}`);
  console.log(`App listening on port ${port}!`);
});
