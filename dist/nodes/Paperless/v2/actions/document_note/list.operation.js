"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'ID',
        name: 'id',
        default: { mode: 'list', value: '' },
        description: 'ID of the document associated with the notes',
        displayOptions: {
            show: {
                resource: ['document_note'],
                operation: ['list'],
            },
        },
        hint: 'The ID of the document associated with the notes',
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                placeholder: `Select a Document...`,
                type: 'list',
                typeOptions: {
                    searchListMethod: 'documentSearch',
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                placeholder: `Enter Document ID...`,
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
            {
                displayName: 'By URL',
                name: 'url',
                placeholder: `Enter Document URL...`,
                type: 'string',
                validation: [
                    {
                        type: 'regex',
                        properties: {
                            regex: '^(?:http|https)://(?:.+?)/documents/(\d+)/details$',
                            errorMessage: 'The URL must be a valid Paperless document URL (e.g. https://paperless.example.com/documents/123/details)',
                        },
                    },
                ],
                extractValue: {
                    type: 'regex',
                    regex: '^(?:http|https)://(?:.+?)/documents/(\d+)/details$',
                },
            },
        ],
        placeholder: 'ID of the document',
        required: true,
        type: 'resourceLocator',
    },
];
async function execute(itemIndex) {
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/documents/${id}/notes/`;
    const responses = (await transport_1.apiRequestPaginated.call(this, itemIndex, 'GET', endpoint));
    const statusCode = responses.reduce((acc, response) => acc + response.statusCode, 0) / responses.length;
    if (statusCode !== 200) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The document notes you are requesting could not be found`, {
            description: JSON.stringify(responses.map((response) => { var _a, _b; return (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.details) !== null && _b !== void 0 ? _b : response === null || response === void 0 ? void 0 : response.statusMessage; })),
        });
    }
    return {
        json: { results: responses.map((response) => response.body).flat() },
    };
}
//# sourceMappingURL=list.operation.js.map