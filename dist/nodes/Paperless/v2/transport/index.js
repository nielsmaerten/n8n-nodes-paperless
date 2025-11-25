"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = apiRequest;
exports.apiRequestPaginated = apiRequestPaginated;
async function apiRequest(itemIndex, method, endpoint, body = {}, query, option = {}) {
    const queryParams = query || {};
    const credentials = await this.getCredentials('paperlessApi');
    const options = {
        headers: {},
        method,
        body,
        qs: queryParams,
        uri: `${credentials.url}${endpoint}`,
        json: true,
    };
    if (Object.keys(option).length) {
        Object.assign(options, option);
    }
    if (!Object.keys(body).length) {
        options.body = undefined;
    }
    return this.helpers.requestWithAuthentication.call(this, 'paperlessApi', options, undefined, itemIndex);
}
async function apiRequestPaginated(itemIndex, method, endpoint, body = {}, query, option = {}) {
    query = query || {};
    const credentials = await this.getCredentials('paperlessApi');
    const options = {
        headers: {},
        method,
        body,
        qs: query,
        uri: `${credentials.url}${endpoint}`,
        json: true,
    };
    if (Object.keys(option).length) {
        Object.assign(options, option);
    }
    if (!Object.keys(body).length) {
        delete options.body;
    }
    const paginationOptions = {
        continue: '={{ ($response?.body?.next ?? null) !== null }}',
        request: {
            url: '={{ $response.body.next }}',
        },
        requestInterval: 100,
    };
    return this.helpers.requestWithAuthenticationPaginated.call(this, options, itemIndex, paginationOptions, 'paperlessApi');
}
//# sourceMappingURL=index.js.map