"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var init_1 = __importDefault(require("../init"));
var controlador_1 = __importDefault(require("../server/controller/controlador"));
var path = require('path');
var router = express_1.Router();
var controller = new controlador_1.default();
router.get('/', function (req, res) {
    var d4 = new init_1.default();
    res.send(d4.d4);
});
/*
router.get ('/i',(req: Request,res: Response)=>{
    res.sendFile(path.join(__dirname+'/views/ilin.html'));
 });
 */
router.get('/i', controller.index);
exports.default = router;
//# sourceMappingURL=router.js.map