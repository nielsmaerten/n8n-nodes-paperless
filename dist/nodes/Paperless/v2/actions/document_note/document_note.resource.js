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
exports.description = exports.remove = exports.list = exports.create = void 0;
const create = __importStar(require("./create.operation"));
exports.create = create;
const list = __importStar(require("./list.operation"));
exports.list = list;
const remove = __importStar(require("./remove.operation"));
exports.remove = remove;
exports.description = [
    {
        displayName: 'Operation',
        name: 'operation',
        default: 'list',
        displayOptions: {
            show: { resource: ['document_note'] },
        },
        noDataExpression: true,
        options: [
            {
                name: 'Create a Document Note',
                value: 'create',
                action: 'Create a new document note',
            },
            {
                name: 'Delete a Document Note',
                value: 'remove',
                action: 'Delete a document note',
            },
            {
                name: 'List Document Notes',
                value: 'list',
                action: 'List all document notes',
            },
        ],
        type: 'options',
    },
    ...create.description,
    ...list.description,
    ...remove.description,
];
//# sourceMappingURL=document_note.resource.js.map