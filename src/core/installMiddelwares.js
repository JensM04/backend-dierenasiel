// const { auth } = require('express-oauth2-jwt-bearer');
const bodyParser = require("koa-bodyparser");
const koaHelmet = require("koa-helmet");
const emoji = require('node-emoji');

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
  
  app.use(bodyParser());

  app.use(koaHelmet());

  // const jwtCheck = auth({
  //   audience: 'http://vichogent.be:40058',
  //   issuerBaseURL: 'https://dev-tn8zletgowdpmihm.us.auth0.com/',
  //   tokenSigningAlg: 'RS256'
  // });
  
  // // enforce on all endpoints
  // app.use(jwtCheck);
  
  // app.get('/authorized', function (req, res) {
  //     res.send('Secured Resource');
  // });

  app.use(async (ctx, next) => {
  getLogger().info(JSON.stringify(ctx.request));
  getLogger().info(JSON.stringify(ctx.request.body));
  return next();
})
}


