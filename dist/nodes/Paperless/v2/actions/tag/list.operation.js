"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("../../transport");
exports.description = [];
async function execute(itemIndex) {
    const endpoint = '/tags/';
    const responses = (await transport_1.apiRequestPaginated.call(this, itemIndex, 'GET', endpoint));
    const statusCode = responses.reduce((acc, response) => acc + response.statusCode, 0) / responses.length;
    if (statusCode !== 200) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The tags you are requesting could not be found`, {
            description: JSON.stringify(responses.map((response) => { var _a, _b; return (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.details) !== null && _b !== void 0 ? _b : response === null || response === void 0 ? void 0 : response.statusMessage; })),
        });
    }
    return {
        json: { results: responses.map((response) => response.body.results).flat() },
    };
}
//# sourceMappingURL=list.operation.js.map