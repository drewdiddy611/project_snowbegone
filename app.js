require('babel-core/register');
require('babel-polyfill');

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const connect = require('./mongo');

const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const debug = require('debug')('koa2:server');
const path = require('path');

const config = require('./config');
const routes = require('./routes');

const port = process.env.PORT || config.port;

// error handler
onerror(app);

/*
 * TEMP
 */
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});
/*
 * END TEMP
 */

app.use(async (ctx, next) => {
  if (!mongoose.connection.readyState) {
    await connect();
  }
  await next();
});

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(
    views(path.join(__dirname, '/views'), {
      options: { settings: { views: path.join(__dirname, 'views') } },
      map: { hbs: 'handlebars' },
      extension: 'hbs'
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  };
  console.log(mongoose.connection.readyState);
  await ctx.render('index', ctx.state);
});

routes(router);
app.on('error', function(err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
