const Router = require('@koa/router');

const userService = require('../service/user');

const getUserById = async (ctx) => {
  ctx.body = await userService.getById(Number(ctx.params.id));
};

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
};


const login = async (ctx) => {
  const { gebruikersnaam, wachtwoord } = ctx.request.body;
  console.log("test:",gebruikersnaam, wachtwoord);
  const token = await userService.login(gebruikersnaam, wachtwoord);
  ctx.body = token;
};


module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });

  router.post('/login',/*validate(login.validationScheme),*/ login);

  router.get('/:id',/* requireAuthentication, validate(getUserById.validationScheme) ,checkUserId,*/ getUserById);
  router.get('/',/* requireAuthentication, requireAdmin, validate(getAllUsers.validationScheme),*/ getAllUsers);

  app.use(router.routes())
     .use(router.allowedMethods());
};