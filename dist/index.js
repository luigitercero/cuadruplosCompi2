"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var router_1 = __importDefault(require("./router/router"));
var init_1 = __importDefault(require("./init"));
var server = server_1.default.init(8080);
server.app.use(router_1.default);
server.start(function () {
    console.log("server starter 1 jsjs");
    new init_1.default();
});
//# sourceMappingURL=index.js.map