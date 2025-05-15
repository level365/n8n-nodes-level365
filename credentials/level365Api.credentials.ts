import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class level365Api implements ICredentialType {
    name = 'level365Api';
    displayName = 'Level365 API';
    // Uses the link to this tutorial as an example
    // Replace with your own docs links when building your own nodes
    documentationUrl = 'https://level365-api-v2.readme.io/reference/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key 1',
            name: 'apiKey',
            type: 'string',
												typeOptions: { password: true },
            default: '',
        },
    ];
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': '=Bearer {{ $credentials.apiKey }}',
            },
        },
    };
    test?: ICredentialTestRequest | undefined = {
        request: {
            baseURL: 'https://api.365sip.com/ns-api/v2',
            url: '/apikeys',

        },
    };
}