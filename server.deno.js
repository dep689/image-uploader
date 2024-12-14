import { Application, Router } from "@oak/oak";

const app = new Application();
const router = new Router();

router.post("/images", async({ request, response }) => {
    const formData = await request.body.formData();
    const imageFile = formData.get("image");
    console.log(imageFile);
    await Deno.writeFile("image.png", await imageFile.bytes())
    response.status = 200;
})

app.use(async (ctx, next) => {
    await next();
    ctx.response.headers.set("access-control-allow-origin", "*");
})
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });