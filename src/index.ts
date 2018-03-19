import Server from './server/server';
import router from './router/router';
import Init from './init';
 const server = Server.init(8080);

 server.app.use(router);
 server.start(()=>{console.log("server starter 1 jsjs");
    new Init();
});