"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const transport_1 = require("../../transport");
exports.description = [];
async function execute(itemIndex) {
    const endpoint = '/documents/next_asn/';
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'GET', endpoint));
    return {
        json: { results: [response] },
    };
}
//# sourceMappingURL=next.operation.js.map