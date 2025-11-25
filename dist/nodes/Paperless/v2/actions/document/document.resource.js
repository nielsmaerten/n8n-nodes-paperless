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
exports.description = exports.update = exports.remove = exports.list = exports.get_sharelink = exports.get_preview = exports.get_metadata_suggestions = exports.get_metadata = exports.get_history = exports.get = exports.create = void 0;
const create = __importStar(require("./create.operation"));
exports.create = create;
const get = __importStar(require("./get.operation"));
exports.get = get;
const get_history = __importStar(require("./get_history.operation"));
exports.get_history = get_history;
const get_metadata = __importStar(require("./get_metadata.operation"));
exports.get_metadata = get_metadata;
const get_metadata_suggestions = __importStar(require("./get_metadata_suggestions.operation"));
exports.get_metadata_suggestions = get_metadata_suggestions;
const get_preview = __importStar(require("./get_preview.operation"));
exports.get_preview = get_preview;
const get_sharelink = __importStar(require("./get_sharelink.operation"));
exports.get_sharelink = get_sharelink;
const list = __importStar(require("./list.operation"));
exports.list = list;
const remove = __importStar(require("./remove.operation"));
exports.remove = remove;
const update = __importStar(require("./update.operation"));
exports.update = update;
exports.description = [
    {
        displayName: 'Operation',
        name: 'operation',
        default: 'list',
        displayOptions: {
            show: { resource: ['document'] },
        },
        noDataExpression: true,
        options: [
            {
                name: 'Create a Document',
                value: 'create',
                action: 'Create a new document',
            },
            {
                name: 'Delete a Document',
                value: 'remove',
                action: 'Delete a document',
            },
            {
                name: 'Get a Document',
                value: 'get',
                action: 'Get a document',
            },
            {
                name: 'Get some Metadata Suggestions',
                value: 'get_metadata_suggestions',
                action: 'Get some metadata suggestions for a document',
            },
            {
                name: 'Get the Document History',
                value: 'get_history',
                action: 'Get the list of changes made to a document',
            },
            {
                name: 'Get the Document Metadata',
                value: 'get_metadata',
                action: 'Get the metadata of the document',
            },
            {
                name: 'Get the Document Preview',
                value: 'get_preview',
                action: 'Get a preview of the document',
            },
            {
                name: 'Get the Document Share Link',
                value: 'get_sharelink',
                action: 'Get the share link of the document',
            },
            {
                name: 'List Documents',
                value: 'list',
                action: 'List all documents',
            },
            {
                name: 'Update a Document',
                value: 'update',
                action: 'Update a document',
            },
        ],
        type: 'options',
    },
    ...create.description,
    ...get.description,
    ...get_history.description,
    ...get_metadata.description,
    ...get_metadata_suggestions.description,
    ...get_preview.description,
    ...get_sharelink.description,
    ...list.description,
    ...remove.description,
    ...update.description,
];
//# sourceMappingURL=document.resource.js.map