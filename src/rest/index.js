const Router = require('@koa/router');

const installUserRouter = require('./user');
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
  
  app.use(router.routes())
     .use(router.allowedMethods());
};
