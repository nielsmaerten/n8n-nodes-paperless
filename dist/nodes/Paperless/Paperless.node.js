"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paperless = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const PaperlessV2_node_1 = require("./v2/PaperlessV2.node");
class Paperless extends n8n_workflow_1.VersionedNodeType {
    constructor() {
        const baseDescription = {
            displayName: 'Paperless-ngx',
            name: 'paperless',
            defaultVersion: 2,
            description: 'Consume documents and metadata from Paperless-ngx API',
            group: ['input'],
            icon: 'file:paperless-ngx.svg',
            usableAsTool: true,
        };
        const nodeVersions = {
            2: new PaperlessV2_node_1.PaperlessV2(baseDescription),
        };
        super(nodeVersions, baseDescription);
    }
}
exports.Paperless = Paperless;
//# sourceMappingURL=Paperless.node.js.map