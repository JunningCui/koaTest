const fn_index = async (ctx)=>{
    ctx.response.body = `<h1>Index Form</h1>
    <form action="/signin" method="POST">
        <p>userName:<input  name="username"> </p>
        <p>password:<input  type="password" name="password"> </p>
        <p><input  type="submit" value="Submit"> </p>
    </form>
    `
}
const fn_signin = async (ctx) => {
        const { username = "" , password =""} = ctx.request.body;
        console.log(username, password);
        if(username === 'koa' && password === '12345'){
                // ctx.response.body = `<h1>Welcome,${username}</h1>`;
                ctx.render('signin-ok.html', {
                    title: 'Sign In OK',
                    name: username
                });
        }else{
                // ctx.response.body = `<h1>Welcome,${username}</h1><a href="">Try again</a>`;
                ctx.render('signin-error.html', {
                    title: 'Sign In Failed',
                    name: username
                });

        }
}

const fn_hello = async (ctx)=>{
    console.log(ctx);
    var {name = ''} = ctx.params;
  
    ctx.response.body = `<h1>Hello,${name}</h1>`;
    ctx.render('signin-ok.html', {
        title: 'Welcome'
    });
}


const package = ('/package/:aid/:cid',async (ctx)=>{

    //获取动态路由的传值

    console.log(ctx.params);  //{ aid: '123', cid: '456' }

    ctx.body="新闻详情";
})

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'GET /hello/:name': fn_hello,
    'GET /package/:cid/:aid': package
}