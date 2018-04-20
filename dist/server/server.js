"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        //server.app.set('views',path.join(__dirname,'views'))
        //server.app.set('view engine','ejs');
    }
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    Server.init = function (port) {
        return new Server(port);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map