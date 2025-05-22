import {
    INodeProperties,
} from 'n8n-workflow';

export const CallOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['call'],
            },
        },
        options: [
            {
                name: 'Get Call',
                value: 'get-call',
                action: 'Get call',
                description: 'Returns metadata about a call',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/cdrs"}}',
                        qs: {
                            id: '={{$parameter["cdr_id"]}}',
                            type: '={{$parameter["additionalFields"]["type"]}}'
                        },
                        returnFullResponse: true,
                        ignoreHttpStatusErrors: true,
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ { statusCode: $response.statusCode, body: $response.body } }}'
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: 'Get All Calls',
                value: 'get-all-calls',
                action: 'Get all calls',
                description: 'Returns metadata about all calls',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/cdrs"}}',
                        qs: {
                            user: '={{$parameter["additionalFields"]["user"]}}',
                            limit: '={{$parameter.limit}}',
                            type: '={{$parameter["additionalFields"]["type"]}}'
                        },
                        returnFullResponse: true,
                        ignoreHttpStatusErrors: true,
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ { statusCode: $response.statusCode, body: $response.body } }}'
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: 'Get Call Recording',
                value: 'get-call-recording',
                action: 'Get call recording',
                description: 'Get the call recording details of a specific call',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/recordings/" + $parameter["call_id"]}}',
                        returnFullResponse: true,
                        ignoreHttpStatusErrors: true,
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ { statusCode: $response.statusCode, body: $response.body } }}'
                                },
                            },
                        ],
                    },
                },
            },
        ],
        default: 'get-call',
    },

    // Parameters
    {
        displayName: 'Record Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
            numberPrecision: 0,
        },

        default: 50,
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                operation: ['get-all-calls'],
            },
        },
    },
    {
        displayName: 'Call ID',
        name: 'call_id',
        type: 'string',
        default: '',
        description: 'Call ID to look up',
        displayOptions: {
            show: {
                operation: ['get-call-recording'],
            },
        },
        required: true,
    },
    {
        displayName: 'CDR ID',
        name: 'cdr_id',
        type: 'string',
        default: '',
        description: 'CDR ID to look up',
        displayOptions: {
            show: {
                operation: ['get-call'],
            },
        },
        required: true,
    },
    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Fields',
        displayOptions: {
            show: {
                resource: ['call'],
                // operation: ['get-all-calls']
            },
        },
        options: [
            {
                displayName: 'Extension',
                description: 'Extension of user to look up',
                name: 'user',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        '/operation': ['get-all-calls'],
                    },
                },
            },
            {
                displayName: 'Call Type',
                description: 'Show only the selected call type',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: 'Inbound',
                        value: '0',
                    },
                    {
                        name: 'Outbound',
                        value: '1',
                    },
                    {
                        name: 'Missed',
                        value: '2',
                    },
                    {
                        name: 'On-Net',
                        value: '3',
                    },
                ],
                default: '0',
                displayOptions: {
                    show: {
                        '/operation': ['get-call', 'get-all-calls'],
                    }
                },
            },
        ],
    },
];
