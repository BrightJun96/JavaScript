import Koa from "koa";
import Router from "koa-router";
import path from "path";
import serve from "koa-static";
import send from "koa-send";
const app = new Koa();
const router = new Router();

const port = 4000;
router.get("/home", (ctx) => {
  ctx.response.body = "home";
});

app.use(router.routes()).use(router.allowedMethods());

const root = path.resolve(__dirname, "../public");

app.use(serve(root));

app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path !== "/") {
    await send(ctx, "index.html", { root });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
