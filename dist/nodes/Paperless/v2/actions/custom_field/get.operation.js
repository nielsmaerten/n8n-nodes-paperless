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
                resource: ['custom_field'],
                operation: ['get'],
            },
        },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                placeholder: `Select a Custom Field...`,
                type: 'list',
                typeOptions: {
                    searchListMethod: 'customFieldSearch',
                    searchFilterRequired: false,
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                placeholder: `Enter Custom Field ID...`,
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
        placeholder: 'ID of the custom_field',
        required: true,
        type: 'resourceLocator',
    },
];
async function execute(itemIndex) {
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/custom_fields/${id}/`;
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'GET', endpoint));
    return { json: { results: [response] } };
}
//# sourceMappingURL=get.operation.js.map