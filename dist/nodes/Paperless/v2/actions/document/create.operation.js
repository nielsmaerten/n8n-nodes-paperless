"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const form_data_1 = __importDefault(require("form-data"));
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'Input Binary Field',
        name: 'binary_property_name',
        default: 'data',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['create'],
            },
        },
        hint: 'The name of the input field containing the file data to be processed',
        required: true,
        type: 'string',
    },
    {
        displayName: 'Additional Fields',
        name: 'additional_fields',
        type: 'collection',
        default: {},
        hint: 'All additional fields are automatically added to the document by Paperless if they are not set',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['create'],
            },
        },
        placeholder: 'Add Field',
        options: [
            {
                displayName: 'Archive Serial Number',
                name: 'archive_serial_number',
                default: '',
                description: 'The archive serial number of the document',
                type: 'number',
            },
            {
                displayName: 'Correspondent',
                name: 'correspondent',
                default: { mode: 'list', value: '' },
                description: 'The correspondent ID of the document',
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
                type: 'resourceLocator',
            },
            {
                displayName: 'Created',
                name: 'created',
                default: '',
                description: 'The date and time the document was created',
                type: 'dateTime',
            },
            {
                displayName: 'Document Type',
                name: 'document_type',
                default: { mode: 'list', value: '' },
                description: 'The document type ID of the document',
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        placeholder: `Select a Document Type...`,
                        type: 'list',
                        typeOptions: {
                            searchListMethod: 'documentTypeSearch',
                            searchFilterRequired: false,
                            searchable: true,
                        },
                    },
                    {
                        displayName: 'By ID',
                        name: 'id',
                        placeholder: `Enter Document Type ID...`,
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
                type: 'resourceLocator',
            },
            {
                displayName: 'Storage Path',
                name: 'storage_path',
                default: { mode: 'list', value: '' },
                description: 'The storage path ID of the document',
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        placeholder: `Select a Storage Path...`,
                        type: 'list',
                        typeOptions: {
                            searchListMethod: 'storagePathSearch',
                            searchFilterRequired: false,
                            searchable: true,
                        },
                    },
                    {
                        displayName: 'By ID',
                        name: 'id',
                        placeholder: `Enter Storage Path ID...`,
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
                type: 'resourceLocator',
            },
            {
                displayName: 'Title',
                name: 'title',
                default: '',
                description: 'The title of the document',
                type: 'string',
            },
        ],
    },
    {
        displayName: 'Custom fields and tags are not yet supported on document creation... Use the update operation to set these values',
        name: 'notice_not_supported',
        default: '',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['create'],
            },
        },
        type: 'notice',
    },
];
async function execute(itemIndex) {
    var _a, _b, _c;
    const endpoint = `/documents/post_document/`;
    const formData = new form_data_1.default();
    const binaryPropertyName = this.getNodeParameter('binary_property_name', itemIndex);
    const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
    const data = binaryData.id
        ? await this.helpers.getBinaryStream(binaryData.id)
        : Buffer.from(binaryData.data, 'base64');
    formData.append('document', data, {
        filename: binaryData.fileName,
        contentType: binaryData.mimeType,
    });
    const additionalFields = this.getNodeParameter('additional_fields', itemIndex);
    Object.entries({
        archive_serial_number: additionalFields.archive_serial_number,
        correspondent: (_a = additionalFields.correspondent) === null || _a === void 0 ? void 0 : _a.value,
        created: additionalFields.created,
        document_type: (_b = additionalFields.document_type) === null || _b === void 0 ? void 0 : _b.value,
        storage_path: (_c = additionalFields.storage_path) === null || _c === void 0 ? void 0 : _c.value,
        title: additionalFields.title,
    })
        .filter(([, value]) => value !== undefined && value !== '')
        .forEach(([key, value]) => {
        formData.append(key, value);
    });
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'POST', endpoint, undefined, undefined, { headers: formData.getHeaders(), formData }));
    return { json: { results: [response] } };
}
//# sourceMappingURL=create.operation.js.map