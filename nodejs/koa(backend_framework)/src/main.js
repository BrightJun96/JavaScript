import Koa from "koa";
const app = new Koa();

const port = 4000;

app.use(async (ctx, next) => {
  console.log(ctx.cookies);
  await next();
});

app.use(async (ctx) => (ctx.body = "hello World! Listening port is 4000"));

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
