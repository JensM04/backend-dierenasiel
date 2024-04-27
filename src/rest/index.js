const Router = require('@koa/router');

const installUserRouter = require('./user');
const installDierRouter = require('./dier');
const installAdoptieRouter = require('./adoptieform');
/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  //import routes
  installUserRouter(router);
  installDierRouter(router);
  installAdoptieRouter(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};
