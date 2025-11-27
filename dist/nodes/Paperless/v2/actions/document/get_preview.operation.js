"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'ID',
        name: 'id',
        default: { mode: 'list', value: '' },
        description: 'The ID of the document for which to retrieve a preview',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['get_preview'],
            },
        },
        hint: 'The ID of the document for which to retrieve a preview',
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
    var _a, _b, _c, _d;
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/documents/${id}`;
    const preview = (await transport_1.apiRequest.call(this, itemIndex, 'GET', `${endpoint}/preview/`, undefined, undefined, { resolveWithFullResponse: true, json: false, encoding: null }));
    const filename = (_d = (_c = (_b = (_a = preview.headers['content-disposition']) === null || _a === void 0 ? void 0 : _a.match(/filename="(?:b['"])?([^"]+)(?:['"])?"/)) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.replace(/^['"]|['"]$/g, '')) !== null && _d !== void 0 ? _d : `${id}.pdf`;
    const data = Buffer.isBuffer(preview.body)
        ? preview.body
        : Buffer.from(preview.body, 'binary');
    return {
        json: {},
        binary: {
            data: await this.helpers.prepareBinaryData(data, filename, 'application/pdf'),
        },
    };
}
//# sourceMappingURL=get_preview.operation.js.map