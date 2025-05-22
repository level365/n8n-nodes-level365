import {

    INodeProperties,
} from 'n8n-workflow';

export const UserOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['user'],
            },
        },
        options: [
            {
                name: 'Get User Info',
                value: 'get-user-info',
                action: 'Get user info',
                description: 'Returns information about the specified user',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/users/" + $parameter["exten"]}}',
                        returnFullResponse: true,
                    },
                },
            },
            {
                name: 'Get All Users',
                value: 'get-all-users',
                action: 'Get all users',
                description: 'Returns all users in the specified domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/users"}}',
                        returnFullResponse: true,
                    },
                },
            },
        ],
        default: 'get-user-info',
    },
    {
        displayName: 'User Extension',
        name: 'exten',
        type: 'string',
        default: '',
        required: true,
        description: 'What is the extension number of the user',
        displayOptions: {
            show: {
                operation: ['get-user-info'],
            },
        },
    },
];
