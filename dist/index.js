"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var router_1 = __importDefault(require("./router/router"));
var init_1 = __importDefault(require("./init"));
var path = require("path");
var server = server_1.default.init(8080);
server.app.use(router_1.default);
/*
import s = require('cosoladite');


server.app.use(bodyParser());
server.app.use(express.static(path.join(__dirname,'server/public')))
server.app.use('/',router);

*/
/*
server.app.set('views',path.join(__dirname,'server/views'))
server.app.set('view engine','ejs');
*/
//server.app.engine('html', require('ejs').renderFile);
server.start(function () {
    console.log("server adsfadfstarter 1 jsjss");
    console.log(path.join(__dirname, 'server/views'));
    new init_1.default();
});
//# sourceMappingURL=index.js.map