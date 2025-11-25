"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("../../transport");
exports.description = [
    {
        displayName: 'ID',
        name: 'id',
        default: '',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['get'],
            },
        },
        placeholder: 'ID of the task',
        required: true,
        type: 'string',
    },
];
async function execute(itemIndex) {
    const endpoint = `/tasks/`;
    const responses = (await transport_1.apiRequestPaginated.call(this, itemIndex, 'GET', endpoint));
    const task_id = this.getNodeParameter('id', itemIndex);
    const task = responses
        .map((response) => response.body)
        .flat()
        .find((task) => task.task_id === task_id);
    if (!task) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Task with ID ${task_id} not found.`);
    }
    return {
        json: { results: [task] },
    };
}
//# sourceMappingURL=get.operation.js.map