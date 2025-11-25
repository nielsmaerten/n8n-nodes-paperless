"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const transport_1 = require("../../transport");
const crypto_1 = require("crypto");
exports.description = [
    {
        displayName: 'ID',
        name: 'id',
        default: { mode: 'list', value: '' },
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['update'],
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
    {
        displayName: 'Update Fields',
        name: 'update_fields',
        default: {},
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Name',
                name: 'name',
                placeholder: 'Name of the custom field',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Select Options',
                name: 'select_options',
                default: [],
                description: 'The options for the select data type',
                options: [
                    {
                        displayName: 'Option',
                        name: 'option',
                        values: [
                            {
                                displayName: 'Name',
                                name: 'name',
                                type: 'string',
                                default: '',
                                description: 'The name of the select option',
                            },
                        ],
                    },
                ],
                placeholder: 'Add Option',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
            },
            {
                displayName: 'Default Currency',
                name: 'default_currency',
                default: '',
                description: 'The default currency for the monetary data type',
                type: 'string',
            },
        ],
        placeholder: 'Add Field',
        type: 'collection',
    },
];
async function execute(itemIndex) {
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/custom_fields/${id}/`;
    const updateFields = this.getNodeParameter('update_fields', itemIndex, {});
    const body = {};
    if (updateFields.name) {
        body.name = updateFields.name;
    }
    if (updateFields.select_options) {
        body.extra_data = {};
        body.extra_data.select_options = updateFields.select_options.option.map((option) => ({
            label: option.name.trim(),
            id: (0, crypto_1.createHash)('sha256').update(option.name.trim()).digest('hex'),
        }));
    }
    if (updateFields.default_currency) {
        body.extra_data = body.extra_data || {};
        body.extra_data.default_currency = updateFields.default_currency;
    }
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'PATCH', endpoint, body));
    return { json: { results: [response] } };
}
//# sourceMappingURL=update.operation.js.map