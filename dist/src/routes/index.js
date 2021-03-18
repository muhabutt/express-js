"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchRoute_1 = require("./handlers/searchRoute");
const searchRouter = express_1.Router();
/**
 * Search get route and handler
 */
searchRouter.get('/search', searchRoute_1.handleSearch);
exports.default = searchRouter;
//# sourceMappingURL=index.js.map