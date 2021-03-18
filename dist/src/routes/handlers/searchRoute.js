"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSearch = void 0;
const searchController_1 = require("../../controllers/searchController");
const handleSearch = (request, response) => {
    // Holds value of the query param 'search query'.
    const searchQuery = typeof request.query !== 'undefined' ? request.query.q : null;
    if (searchQuery !== null) {
        searchController_1._search(searchQuery).then((res) => {
            if (res && typeof res.name !== 'undefined' && res.name === 'Error') {
                const errorResponse = {
                    success: false,
                    message: res.message,
                    status: 400
                };
                response.status(400);
                response.json(errorResponse);
            }
            else if (res) {
                const jsonResponse = {
                    success: true,
                    totalCount: res.totalCount,
                    records: res.records.length > 0 ? res.records : null,
                    status: 200
                };
                response.status(200);
                response.json(jsonResponse);
            }
        });
    }
    else {
        response.end();
    }
};
exports.handleSearch = handleSearch;
//# sourceMappingURL=searchRoute.js.map