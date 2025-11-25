"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const asn = __importStar(require("./asn/asn.resource"));
const correspondent = __importStar(require("./correspondent/correspondent.resource"));
const custom_field = __importStar(require("./custom_field/custom_field.resource"));
const document = __importStar(require("./document/document.resource"));
const document_note = __importStar(require("./document_note/document_note.resource"));
const document_type = __importStar(require("./document_type/document_type.resource"));
const tag = __importStar(require("./tag/tag.resource"));
const task = __importStar(require("./task/task.resource"));
exports.description = {
    displayName: 'Paperless-ngx',
    name: 'paperless',
    icon: 'file:paperless-ngx.svg',
    group: ['input'],
    version: 2,
    subtitle: '={{ $parameter.operation + ": " + $parameter.resource }}',
    description: 'Consume documents and metadata from Paperless-ngx API',
    defaults: { name: 'Paperless-ngx' },
    credentials: [{ name: 'paperlessApi', required: true }],
    inputs: ['main'],
    outputs: ['main'],
    properties: [
        {
            displayName: 'Resource',
            name: 'resource',
            default: 'document',
            noDataExpression: true,
            options: [
                {
                    name: 'ASN',
                    value: 'asn',
                    description: 'Archive Serial Number',
                },
                {
                    name: 'Correspondent',
                    value: 'correspondent',
                    description: 'Person or organization behind documents',
                },
                {
                    name: 'Custom Field',
                    value: 'custom_field',
                    description: 'User-defined additional informative fields',
                },
                {
                    name: 'Document',
                    value: 'document',
                    description: 'Scanned document or file saved in Paperless',
                },
                {
                    name: 'Document Note',
                    value: 'document_note',
                    description: 'Additional information about a document',
                },
                {
                    name: 'Document Type',
                    value: 'document_type',
                    description: 'Kind of a document',
                },
                {
                    name: 'Tag',
                    value: 'tag',
                    description: 'Label for documents',
                },
                {
                    name: 'Task',
                    value: 'task',
                    description: 'Work to be done on a document',
                },
            ],
            type: 'options',
        },
        ...asn.description,
        ...correspondent.description,
        ...custom_field.description,
        ...document.description,
        ...document_note.description,
        ...document_type.description,
        ...tag.description,
        ...task.description,
    ],
};
//# sourceMappingURL=version.js.map