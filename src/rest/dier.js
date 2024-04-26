const Router = require('@koa/router');
const Joi = require('joi')

const dierService = require('../service/dier');
const validate = require('../core/validation')
const ServiceError = require('../core/serviceError'); 
const handleDBError = require('../service/_handleDBError');
const { requireAuthentication, makeRequireRole } = require('../core/auth'); 

const getAllDieren = async (ctx) => {
  const dieren = await dierService.getAll();
  ctx.status = 200;
  ctx.body = dieren;

};

const getAlleHonden = async (ctx) => {
    const honden = await dierService.getAlleHonden();
    ctx.status = 200;
    ctx.body = honden;
};

const getAlleKatten = async (ctx) => {
    const katten = await dierService.getAlleKatten();
    ctx.status = 200;
    ctx.body = katten;
};

const getByName = async (ctx) => {
    const dier = await dierService.getByName(String(ctx.params.naam));
    ctx.status = 200;
    ctx.body = dier;
};

const getById = async (ctx) => {
    console.log(ctx.params.id);
    const dier = await dierService.getById(Number(ctx.params.id));
    console.log(dier);
    ctx.status = 200;
    ctx.body = dier;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/dieren',
  });

  router.get('/honden', getAlleHonden);
  router.get('/katten', getAlleKatten);
  router.get('/dier/:naam', getByName);
  router.get('/:id',getById);
  router.get('/', getAllDieren);

  app.use(router.routes())
     .use(router.allowedMethods());
};
