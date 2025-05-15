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
                            id: '={{$parameter["call_id"]}}',
                        },
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
                            user: '={{$parameter["user"]}}',
                            limit: '={{$parameter.limit}}',
                        },
                    },
                },
            },
            {
                name: 'Get Call Recording',
                value: 'get-call-recording',
                action: 'Download call recording',
                description: 'Downloads the call recording of a specific call',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/recordings/" + $parameter["call_id"]}}',
                        returnFullResponse: true,

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
            maxValue: 1000,
            numberPrecision: 0,
        },

        default: 100,
        description: 'Max number of results to return',
        displayOptions: {
            show: {
                operation: ['get-all-calls'],
            },
        },
    },
    {
        displayName: 'Extension',
        name: 'user',
        type: 'string',
        default: '',
        description: 'Extension of user to look up',
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

];
