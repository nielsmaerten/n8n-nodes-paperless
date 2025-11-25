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
        displayOptions: {
            show: {
                resource: ['correspondent'],
                operation: ['update'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                placeholder: `Select a Correspondent...`,
                type: 'list',
                typeOptions: {
                    searchListMethod: 'correspondentSearch',
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                placeholder: `Enter Correspondent ID...`,
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
        placeholder: 'ID of the correspondent',
        required: true,
        type: 'resourceLocator',
    },
    {
        displayName: 'Update Fields',
        name: 'update_fields',
        default: {},
        displayOptions: {
            show: {
                resource: ['correspondent'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                placeholder: 'Name of the correspondent',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Matching Algorithm',
                name: 'matching_algorithm',
                default: 6,
                options: [
                    { name: 'None: Disable matching', value: 0 },
                    { name: 'Any: Document contains any of these words (space separated)', value: 1 },
                    { name: 'All: Document contains all of these words (space separated)', value: 2 },
                    { name: 'Exact: Document contains this string', value: 3 },
                    { name: 'Regular Expression: Document Matches This Regular Expression', value: 4 },
                    { name: 'Fuzzy: Document contains a word similar to this word', value: 5 },
                    { name: 'Auto: Learn matching automatically', value: 6 },
                ],
                type: 'options',
            },
            {
                displayName: 'Matching Expression',
                name: 'match',
                default: '',
                placeholder: 'Matching expression to match',
                type: 'string',
            },
        ],
        placeholder: 'Add Field',
        type: 'collection',
    },
];
async function execute(itemIndex) {
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/correspondents/${id}/`;
    const updateFields = this.getNodeParameter('update_fields', itemIndex, {});
    const body = {};
    for (const key of Object.keys(updateFields)) {
        if (updateFields[key] !== null && updateFields[key] !== undefined) {
            body[key] = updateFields[key];
        }
    }
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'PATCH', endpoint, body));
    return { json: { results: [response] } };
}
//# sourceMappingURL=update.operation.js.map