"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'Name',
        name: 'name',
        displayOptions: {
            show: {
                resource: ['correspondent'],
                operation: ['create'],
            },
        },
        placeholder: 'Name of the correspondent',
        required: true,
        type: 'string',
        default: '',
    },
    {
        displayName: 'Matching Algorithm',
        name: 'matching_algorithm',
        default: 6,
        displayOptions: {
            show: {
                resource: ['correspondent'],
                operation: ['create'],
            },
        },
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
        displayOptions: {
            show: {
                resource: ['correspondent'],
                operation: ['create'],
                matching_algorithm: [1, 2, 3, 4, 5],
            },
        },
        placeholder: 'Matching expression to match',
        type: 'string',
    },
];
async function execute(itemIndex) {
    const endpoint = `/correspondents/`;
    const body = {
        name: this.getNodeParameter('name', itemIndex),
        matching_algorithm: this.getNodeParameter('matching_algorithm', itemIndex),
        match: this.getNodeParameter('match', itemIndex, ''),
    };
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'POST', endpoint, body));
    return { json: { results: [response] } };
}
//# sourceMappingURL=create.operation.js.map