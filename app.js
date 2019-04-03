
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const controller =require("./controller.js");

let templating = require('./templating');
// eslint-disable-next-line
const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();
const port = 5000;
// import {  } from "./";

app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
        var
            start = new Date().getTime(),
            execTime;
        await next();
        execTime = new Date().getTime() - start;
        ctx.response.set('X-Response-Time', `${execTime}ms`);
    });

if (! isProduction) {
        let staticFiles = require('./static-files.js');
        console.log(staticFiles);
        // eslint-disable-next-line
        app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(async (ctx, next) => {
        console.log(`${ctx.request.method} ${ctx.request.url}`);
        await next();
})
// console.log(controllers);

app.use(bodyParser());

app.use(templating('templates', {
        noCache: !isProduction,
        watch: !isProduction
    }));

app.use(controller());



app.listen(port);

console.log("app start at port " + port + "....");