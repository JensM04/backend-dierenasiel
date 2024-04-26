// const Koa = require("koa");
// const winston = require("winston");
// const bodyParser = require("koa-bodyparser");
// const config = require("config");
// const koaHelmet = require("koa-helmet");

// //const NODE_ENV = config.get("env");
// const LOG_LEVEL= config.get("log.level");
// const LOG_DISABLED = config.get("log.disabled");

// console.log(`log level ${LOG_LEVEL}, logs enabled: ${!LOG_DISABLED}`)

// const logger = winston.createLogger({
//   level: LOG_LEVEL,
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console({silent: LOG_DISABLED}),
//   ]
// })

// const app = new Koa();

// app.use(bodyParser());

// app.use(koaHelmet());

// app.use(async (ctx, next) => {
//   logger.info(JSON.stringify(ctx.request));
//   logger.info(JSON.stringify(ctx.request.body));
//   return next();
// })

// app.listen(9000, () => {
//   logger.info("🚀 Server listening on http://localhost:9000")
// })

const createServer = require('./createServer');

async function onClose(server){
  await server.stop();
  process.exit(0);
}
async function main() {
  try {
    const server = await createServer();
    await server.start();


  process.on('SIGTERM', onClose);
  process.on('SIGQUIT', onClose);

  }
  catch(error) {
    console.log(error);
    process.exit(-1);
  }
}

main();