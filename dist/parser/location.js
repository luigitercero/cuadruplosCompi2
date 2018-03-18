"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(location) {
        if (location != null) {
            this.columna = location.last_column;
            this.fila = location.first_line;
        }
    }
    return Location;
}());
exports.default = Location;
