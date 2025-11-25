import type { IExecuteFunctions, INodeType, INodeTypeDescription, INodeTypeBaseDescription, INodeExecutionData } from 'n8n-workflow';
import { listSearch } from './methods';
export declare class PaperlessV2 implements INodeType {
    description: INodeTypeDescription;
    constructor(baseDescription: INodeTypeBaseDescription);
    methods: {
        listSearch: typeof listSearch;
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
