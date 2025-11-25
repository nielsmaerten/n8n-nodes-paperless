"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperlessApi = void 0;
class PaperlessApi {
    constructor() {
        this.name = 'paperlessApi';
        this.displayName = 'Paperless-ngx API';
        this.documentationUrl = 'https://docs.paperless-ngx.com/api/#authorization';
        this.properties = [
            {
                name: 'url',
                displayName: 'Paperless-ngx API URL',
                default: 'http://paperless:8000/api',
                required: true,
                type: 'string',
                validateType: 'url',
            },
            {
                name: 'apiKey',
                displayName: 'Paperless-ngx API Key',
                default: '',
                required: true,
                type: 'string',
                typeOptions: { password: true },
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Token {{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.PaperlessApi = PaperlessApi;
//# sourceMappingURL=PaperlessApi.credentials.js.map