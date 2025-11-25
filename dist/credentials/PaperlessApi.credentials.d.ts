import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';
export declare class PaperlessApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
}
