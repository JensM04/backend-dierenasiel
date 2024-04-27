const Router = require('@koa/router');
const Joi = require('joi');

const adoptieService = require('../service/adoptieform');
const validate = require('../core/validation');
const ServiceError = require('../core/serviceError');
const handleDBError = require('../service/_handleDBError');

const createAdoptieForm = async (ctx) => {
  try {
    const {
      gebruikerid,
      aantalmenseningezien,
      kinderen,
      andereDieren,
      heeftTuin,
      isHuurder,
      tijdDierAlleenThuis,
      heeftReedsErvaring,
      verwachtingen,
      voorkeuren
    } = ctx.request.body;
    
    const newAdoptie = await adoptieService.create({
      gebruikerid,
      aantalmenseningezien,
      kinderen,
      andereDieren,
      heeftTuin,
      isHuurder,
      tijdDierAlleenThuis,
      heeftReedsErvaring,
      verwachtingen,
      voorkeuren
    });
    ctx.body = newAdoptie;
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/adoptie',
  });

  router.post('/', createAdoptieForm);

  app.use(router.routes())
    .use(router.allowedMethods());
};
