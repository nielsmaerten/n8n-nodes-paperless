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
        description: 'ID of the document to get suggestions for',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['get_metadata_suggestions'],
            },
        },
        hint: 'The ID of the document to get suggestions for',
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
    {
        displayName: 'Options',
        name: 'options',
        default: {},
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['get_metadata_suggestions'],
            },
        },
        hint: 'Additional options to include in the suggestion',
        options: [
            {
                displayName: 'Return Metadata Values',
                name: 'use_metadata_values',
                default: false,
                description: 'Whether to return metadata values instead of only metadata IDs. By default, only metadata IDs are returned.',
                type: 'boolean',
            },
        ],
        placeholder: 'Add options',
        type: 'collection',
    },
];
async function execute(itemIndex) {
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/documents/${id}/suggestions/`;
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'GET', endpoint));
    const enrichedResponse = { ...response };
    const options = this.getNodeParameter('options', itemIndex, null);
    if (options.use_metadata_values) {
        const fetchMetadata = async (id, endpoint) => {
            const response = (await transport_1.apiRequest.call(this, itemIndex, 'GET', endpoint));
            return response.name;
        };
        try {
            enrichedResponse.correspondents = await Promise.all(response.correspondents.map((id) => fetchMetadata(id, `/correspondents/${id}/`)));
            enrichedResponse.tags = await Promise.all(response.tags.map((id) => fetchMetadata(id, `/tags/${id}/`)));
            enrichedResponse.document_types = await Promise.all(response.document_types.map((id) => fetchMetadata(id, `/document_types/${id}/`)));
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to retrieve metadata values: ${error}`);
        }
    }
    return {
        json: { results: [enrichedResponse] },
    };
}
//# sourceMappingURL=get_metadata_suggestions.operation.js.map