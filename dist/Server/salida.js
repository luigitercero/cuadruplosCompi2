"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Saludar = __importStar(require("./Saludar"));
var probando = /** @class */ (function () {
    function probando() {
    }
    probando.prototype.count = function () {
        var sal = new Saludar.Saludar();
        ;
        for (var index = 0; index < 10; index++) {
            console.log('esto es una ssdfprue zb' + sal.saludo());
        }
    };
    return probando;
}());
var count = new probando();
count.count();
//# sourceMappingURL=salida.js.map