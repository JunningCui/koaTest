const fs = require("fs");

function addMapping (router, mappings){
    for(var url in mappings){
            if(url.startsWith("GET")){
                    let path = url.substring(4);
                    router.get(path, mappings[url]);
                    console.log(`register URL mapping: GET ${path}`)
            }else if(url.startsWith("POST")){
                    let path = url.substring(5);
                    router.post(path, mappings[url]);
                    console.log(`register URL mapping: POST ${path}`) 
            }
    }
}
function addControllers (router, controllers_dir) {
// eslint-disable-next-line
    var files = fs.readdirSync(__dirname + '/' + controllers_dir);
    console.log(files);
    var js_files = files.filter((f)=>{
            return f.endsWith(".js");
    })
    for(var f of js_files){
            console.log(`process controller: ${f}....`);
            // eslint-disable-next-line
            let mappings = require(__dirname + '/' + controllers_dir + '/'  + f);
           addMapping(router, mappings);
    }
}

module.exports = function (dir){
    let controllers_dir = dir || 'controllers',
        router = require("koa-router")();
        addControllers(router, controllers_dir);
        return router.routes();
}