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
        description: 'ID of the document',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['update'],
            },
        },
        hint: 'The ID of the document',
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
        displayName: 'Update Fields',
        name: 'update_fields',
        type: 'collection',
        default: {},
        hint: 'All additional fields are automatically added to the document by Paperless if they are not set',
        displayOptions: {
            show: {
                resource: ['document'],
                operation: ['update'],
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
                displayName: 'Content',
                name: 'content',
                default: '',
                description: 'Plain text content for the document',
                type: 'string',
                typeOptions: {
                    rows: 5,
                },
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
                displayName: 'Custom Fields',
                name: 'custom_fields',
                default: {},
                description: 'The custom field of the document',
                options: [
                    {
                        displayName: 'Custom Field',
                        name: 'values',
                        values: [
                            {
                                displayName: 'Field',
                                name: 'field',
                                default: { mode: 'list', value: '' },
                                description: 'The custom field ID',
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
                                type: 'resourceLocator',
                            },
                            {
                                displayName: 'Value',
                                name: 'value',
                                default: '',
                                description: 'The custom field value',
                                type: 'string',
                            },
                        ],
                    },
                ],
                placeholder: 'Add Custom Field',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
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
                displayName: 'Tags',
                name: 'tags',
                default: {},
                description: 'The tag IDs of the document',
                options: [
                    {
                        displayName: 'Tag',
                        name: 'values',
                        values: [
                            {
                                displayName: 'Tag',
                                name: 'tag',
                                default: { mode: 'list', value: '' },
                                description: 'The tag ID',
                                modes: [
                                    {
                                        displayName: 'From List',
                                        name: 'list',
                                        placeholder: `Select a Tag to add...`,
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
                                        placeholder: `Enter Tag ID to add...`,
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
                                        displayName: 'By Array of IDs',
                                        name: 'array',
                                        placeholder: `Enter Tag IDs as an Array...`,
                                        type: 'string',
                                        hint: 'Array of tag IDs in JSON format, e.g. {{[1, 2]}}. Existing tags will be overwritten.',
                                        validation: [
                                            {
                                                type: 'json',
                                                properties: {
                                                    errorMessage: 'The value must be a valid JSON array',
                                                },
                                            },
                                        ],
                                    }
                                ],
                                type: 'resourceLocator',
                            },
                        ],
                    },
                ],
                placeholder: 'Add Tag',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
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
];
async function execute(itemIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const id = this.getNodeParameter('id', itemIndex).value;
    const endpoint = `/documents/${id}/`;
    const updateFields = this.getNodeParameter('update_fields', itemIndex, {});
    const hasCustomFields = Object.prototype.hasOwnProperty.call(updateFields, 'custom_fields');
    const hasTags = Object.prototype.hasOwnProperty.call(updateFields, 'tags');
    let existingDocument = null;
    if (hasCustomFields || hasTags) {
        existingDocument = (await transport_1.apiRequest.call(this, itemIndex, 'GET', endpoint));
    }
    let customFields;
    if (hasCustomFields) {
        const mergedCustomFields = new Map();
        ((_a = existingDocument === null || existingDocument === void 0 ? void 0 : existingDocument.custom_fields) !== null && _a !== void 0 ? _a : []).forEach((customField) => {
            mergedCustomFields.set(customField.field, customField);
        });
        ((_c = (_b = updateFields.custom_fields) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : []).forEach((customField) => {
            const fieldId = customField.field.value;
            const value = customField.value;
            if (value === null) {
                mergedCustomFields.delete(fieldId);
                return;
            }
            mergedCustomFields.set(fieldId, { field: fieldId, value });
        });
        customFields = Array.from(mergedCustomFields.values());
    }
    let tags;
    if (hasTags) {
        const tagInputs = ((_e = (_d = updateFields.tags) === null || _d === void 0 ? void 0 : _d.values) !== null && _e !== void 0 ? _e : []).map((tag) => { var _a, _b, _c; return (_c = (_b = (_a = tag === null || tag === void 0 ? void 0 : tag.tag) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : tag === null || tag === void 0 ? void 0 : tag.tag) !== null && _c !== void 0 ? _c : tag; });
        const overwriteTags = tagInputs.some((tagInput) => Array.isArray(tagInput));
        const incomingTags = tagInputs.flatMap((tagInput) => (Array.isArray(tagInput) ? tagInput : [tagInput])).filter((tagId) => tagId !== undefined && tagId !== null && `${tagId}`.length > 0);
        const baseTags = overwriteTags ? [] : (_f = existingDocument === null || existingDocument === void 0 ? void 0 : existingDocument.tags) !== null && _f !== void 0 ? _f : [];
        tags = Array.from(new Set([...baseTags, ...incomingTags]));
    }
    const body = {
        archive_serial_number: updateFields.archive_serial_number,
        content: updateFields.content,
        correspondent: (_g = updateFields.correspondent) === null || _g === void 0 ? void 0 : _g.value,
        created: updateFields.created,
        custom_fields: customFields,
        document_type: (_h = updateFields.document_type) === null || _h === void 0 ? void 0 : _h.value,
        storage_path: (_j = updateFields.storage_path) === null || _j === void 0 ? void 0 : _j.value,
        tags,
        title: updateFields.title,
    };
    const response = (await transport_1.apiRequest.call(this, itemIndex, 'PATCH', endpoint, body));
    return { json: { results: [response] } };
}
//# sourceMappingURL=update.operation.js.map