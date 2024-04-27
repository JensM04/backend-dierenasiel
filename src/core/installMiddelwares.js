// const { auth } = require('express-oauth2-jwt-bearer');
const bodyParser = require("koa-bodyparser");
const koaHelmet = require("koa-helmet");
const emoji = require('node-emoji');
const config = require('config');
const koaCors = require('@koa/cors'); // 👈 1

//..
const CORS_ORIGINS = config.get('cors.origins'); // 👈 2
const CORS_MAX_AGE = config.get('cors.maxAge'); // 👈 2

const { getLogger } = require('./logging');



module.exports = function installMiddelwares(app) {
  app.use(async (ctx, next) => {
    getLogger().info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);
  
    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get('skull');
      if (ctx.status >= 400) return emoji.get('x');
      if (ctx.status >= 300) return emoji.get('rocket');
      if (ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();
  
      getLogger().info(
        `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`
      );
    } catch (error) {
      getLogger().error(
        `${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`,
        {
          error,
        }
      );
      throw error;
    }
  });

  app.use(koaCors({
    origin: (ctx) => { // 👈 4
      if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      // Not a valid domain at this point, let's return the first valid as we should return a string
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'], // 👈 5
    maxAge: CORS_MAX_AGE, // 👈 6
  }))
  
  app.use(bodyParser());

  app.use(koaHelmet());

  app.use(async (ctx, next) => {
  getLogger().info(JSON.stringify(ctx.request));
  getLogger().info(JSON.stringify(ctx.request.body));
  return next();
})
}


