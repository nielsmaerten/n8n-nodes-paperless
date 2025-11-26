"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'Tag',
        name: 'tag',
        default: { mode: 'list', value: '' },
        description: 'Only return documents that have this tag',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['list'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                placeholder: `Select a Tag...`,
                type: 'list',
                typeOptions: {
                    searchListMethod: 'tagSearch',
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                placeholder: `Enter Tag ID...`,
                type: 'string',
                validation: [
                    {
                        type: 'regex',
                        properties: {
                            regex: '^[1-9][0-9]*$',
                            errorMessage: 'The ID must be a positive integer',
                        },
                    },
                ],
            },
        ],
        placeholder: 'ID of the tag',
        type: 'resourceLocator',
    },
];
async function execute(itemIndex) {
    var _a;
    const endpoint = '/documents/';
    const tagId = (_a = this.getNodeParameter('tag', itemIndex, {})) === null || _a === void 0 ? void 0 : _a.value;
    const query = tagId ? { 'tags__id': tagId } : undefined;
    const responses = (await transport_1.apiRequestPaginated.call(this, itemIndex, 'GET', endpoint, undefined, query));
    const statusCode = responses.reduce((acc, response) => acc + response.statusCode, 0) / responses.length;
    if (statusCode !== 200) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The documents you are requesting could not be found`, {
            description: JSON.stringify(responses.map((response) => { var _a, _b; return (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.details) !== null && _b !== void 0 ? _b : response === null || response === void 0 ? void 0 : response.statusMessage; })),
        });
    }
    return {
        json: { results: responses.map((response) => response.body.results).flat() },
    };
}
//# sourceMappingURL=list.operation.js.map