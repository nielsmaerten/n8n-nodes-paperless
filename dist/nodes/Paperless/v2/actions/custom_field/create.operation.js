"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const crypto_1 = require("crypto");
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'Name',
        name: 'name',
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['create'],
            },
        },
        placeholder: 'Name of the custom field',
        required: true,
        type: 'string',
        default: '',
    },
    {
        displayName: 'Data Type',
        name: 'data_type',
        default: 'string',
        description: 'The data type of the custom field',
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['create'],
            },
        },
        options: [
            { name: 'Boolean', value: 'boolean' },
            { name: 'Date', value: 'date' },
            { name: 'Document Link', value: 'documentlink' },
            { name: 'Float', value: 'float' },
            { name: 'Integer', value: 'integer' },
            { name: 'Monetary', value: 'monetary' },
            { name: 'Select', value: 'select' },
            { name: 'String', value: 'string' },
            { name: 'URL', value: 'url' },
        ],
        type: 'options',
    },
    {
        displayName: 'Select Options',
        name: 'select_options',
        default: [],
        description: 'The options for the select data type',
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['create'],
                data_type: ['select'],
            },
        },
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
        displayOptions: {
            show: {
                resource: ['custom_field'],
                operation: ['create'],
                data_type: ['monetary'],
            },
        },
        type: 'string',
    },
];
async function execute(itemIndex) {
    const endpoint = `/custom_fields/`;
    const body = {
        name: this.getNodeParameter('name', itemIndex),
        data_type: this.getNodeParameter('data_type', itemIndex),
        extra_data: {},
    };
    this.logger.debug(`Creating custom field: ${JSON.stringify(this.getNodeParameter('select_options', itemIndex, null))}`);
    const selectOptions = this.getNodeParameter('select_options', itemIndex, null);
    if (selectOptions) {
        body.extra_data.select_options = selectOptions.option.map((option) => ({
            label: option.name.trim(),
            id: (0, crypto_1.createHash)('sha256').update(option.name.trim()).digest('hex'),
        }));
    }
    const defaultCurrency = this.getNodeParameter('default_currency', itemIndex, null);
    if (defaultCurrency) {
        body.extra_data.default_currency = defaultCurrency;
    }
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'POST', endpoint, body));
    return { json: { results: [response] } };
}
//# sourceMappingURL=create.operation.js.map