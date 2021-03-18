"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleSearch = void 0;
const urls_1 = require("../urls");
const axios_1 = __importDefault(require("axios")); // axios
/**
 *
 * @param queryString
 * @return Promise<RESPONSE>
 */
const _handleSearch = (queryString) => __awaiter(void 0, void 0, void 0, function* () {
    let params = null;
    const axiosPromises = []; // will contain apis response data
    urls_1.getUrls().map((url) => {
        if (url.hel) {
            params = {
                format: 'json',
                q: queryString
            };
            axiosPromises.push(getData(url.hel, params));
        }
        else if (url.fina) {
            params = {
                lookfor: queryString
            };
            axiosPromises.push(getData(url.fina, params));
        }
    });
    //@todo create type for api responses
    return axios_1.default.all(axiosPromises)
        .then(axios_1.default.spread((...responses) => {
        return {
            success: true,
            totalCount: responses[0].data.data.length + responses[1].data.records.length,
            records: responses[0].data.data.concat(responses[1].data.records),
            status: 200
        };
    }))
        .catch((error) => {
        const response = {
            name: error.name,
            message: error.message,
            success: false
        };
        return response;
    });
});
exports._handleSearch = _handleSearch;
/**
 *
 * @param url
 * @param params
 * @return Promise<any>
 * @todo create type for response api.
 */
const getData = (url, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get(`${url}/search`, {
        params
    });
});
//# sourceMappingURL=searchController.js.map