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
exports.router = router;
const n8n_workflow_1 = require("n8n-workflow");
const asn = __importStar(require("./asn/asn.resource"));
const correspondent = __importStar(require("./correspondent/correspondent.resource"));
const custom_field = __importStar(require("./custom_field/custom_field.resource"));
const document = __importStar(require("./document/document.resource"));
const document_note = __importStar(require("./document_note/document_note.resource"));
const document_type = __importStar(require("./document_type/document_type.resource"));
const tag = __importStar(require("./tag/tag.resource"));
const task = __importStar(require("./task/task.resource"));
async function router() {
    var _a;
    const returnData = [];
    for (let itemIndex = 0; itemIndex < this.getInputData().length; itemIndex++) {
        const resource = this.getNodeParameter('resource', itemIndex);
        const operation = this.getNodeParameter('operation', itemIndex);
        const paperlessNodeData = { resource, operation };
        try {
            switch (paperlessNodeData.resource) {
                case 'asn':
                    returnData.push(await asn[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'correspondent':
                    returnData.push(await correspondent[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'custom_field':
                    returnData.push(await custom_field[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'document':
                    returnData.push(await document[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'document_note':
                    returnData.push(await document_note[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'document_type':
                    returnData.push(await document_type[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'tag':
                    returnData.push(await tag[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                case 'task':
                    returnData.push(await task[paperlessNodeData.operation].execute.call(this, itemIndex));
                    break;
                default:
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The operation "${paperlessNodeData.operation}" on resource "${paperlessNodeData.resource}" is not supported.`);
            }
        }
        catch (error) {
            if ((_a = error.description) === null || _a === void 0 ? void 0 : _a.includes('cannot accept the provided value')) {
                error.description += ". Consider using 'Typecast' option";
            }
            throw error;
        }
    }
    return [returnData];
}
//# sourceMappingURL=router.js.map