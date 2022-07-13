import Koa from "koa";
import Router from "koa-router";
import path from "path";
const app = new Koa();
const router = new Router();

const port = 4000;

const myPath = path.resolve("a", "./b", "c");

console.log(myPath);
router.get("/", (ctx) => {
  ctx.response.body = "home";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

//
