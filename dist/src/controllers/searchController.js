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
exports._search = void 0;
const urls_1 = require("../urls");
const axios_1 = __importDefault(require("axios")); // axios
/**
 *
 * @param queryString
 * @return Promise<RESPONSE>
 */
const _search = (queryString) => __awaiter(void 0, void 0, void 0, function* () {
    let params = null;
    const axiosPromises = []; // will contain apis response data
    const URLs = urls_1.getUrls();
    URLs.forEach((url) => {
        // check url to set the parameters for calling the api.
        if (url.hel) {
            params = {
                format: 'json',
                q: queryString
            };
            axiosPromises.push(getPromise(url.hel, params));
        }
        else if (url.fina) {
            params = {
                lookfor: queryString
            };
            axiosPromises.push(getPromise(url.fina, params));
        }
    });
    /**
       * @todo create type for api responses
       * call all the promises, here we need to check the response structure for instance
       * response[0] has response[0].data.data array for the records
       * response[1] has response[0].data.records array for the records
       */
    return axios_1.default.all(axiosPromises)
        .then(axios_1.default.spread((...responses) => {
        const mergedResponses = [];
        if (typeof responses[0].data.data !== 'undefined' && responses[0].data.data.length > 0) {
            responses[0].data.data.forEach((item) => {
                if (verifyObjectProp(item, 'id') && verifyObjectProp(item.short_description, 'fi')) {
                    // es6 way of object destruction.
                    const subSet = ((name, short_description, apiUrl) => ({ name, short_description, apiUrl }))(item.id, item.short_description.fi, 'Hel.fi');
                    mergedResponses.push(subSet);
                }
            });
        }
        if (typeof responses[1].data.records !== 'undefined' && responses[1].data.records.length > 0) {
            responses[1].data.records.forEach((item) => {
                if (verifyObjectProp(item, 'title') && verifyObjectProp(item, 'subjects')) {
                    const subSet = ((name, short_description, apiUrl) => ({ name, short_description, apiUrl }))(item.title, item.subjects, 'Finna.fi');
                    mergedResponses.push(subSet);
                }
            });
        }
        return {
            success: true,
            totalCount: mergedResponses.length,
            records: mergedResponses,
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
exports._search = _search;
/**
 *
 * @param url
 * @param params
 * @return Promise<any>
 */
const getPromise = (url, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get(`${url}/search`, {
        params
    });
});
/**
 * Recursive function , for nested object property is not undefined or null
 * @param object
 * @param name
 * @return {boolean}
 */
const verifyObjectProp = (object, name) => {
    let bol = true;
    const recursion = (object, current) => {
        if (object) {
            for (const key in object) {
                if (key === name) {
                    const value = object[key];
                    if (value !== 'undefined') {
                        if (value && typeof value === 'object') {
                            recursion(value, name);
                        }
                        else {
                            bol = true;
                        }
                    }
                    else {
                        bol = false;
                    }
                }
            }
        }
        else {
            bol = false;
        }
    };
    recursion(object);
    return bol;
};
//# sourceMappingURL=searchController.js.map