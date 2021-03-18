"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = void 0;
/**
 * Return apis, you can add as many as you want but the response structure needs to be
 * consider.
 */
const getUrls = () => {
    return [
        { hel: 'http://api.hel.fi/linkedevents/v1' },
        { fina: 'https://api.finna.fi/api/v1' }
    ];
};
exports.getUrls = getUrls;
//# sourceMappingURL=urls.js.map