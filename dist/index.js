"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./src/routes"));
const app = express_1.default();
const port = process.env.PORT || 3000;
// public index.html route
app.get('/', function (req, res) {
    res.sendFile(path_1.default.resolve('public/index.html'));
});
// serving public files
app.use(express_1.default.static('public'));
// api routes
app.use('/api/v1', routes_1.default);
app.listen(port);
//# sourceMappingURL=index.js.map