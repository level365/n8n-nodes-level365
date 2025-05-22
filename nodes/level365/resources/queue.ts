import {
    INodeProperties,
} from 'n8n-workflow';

export const QueueOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['queue'],
            },
        },
        options: [
            {
                name: 'Get Queue Info',
                value: 'get-queue-info',
                action: 'Get queue info',
                description: 'Returns information about the specified queue',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/callqueues/" + $parameter["queue"]}}',
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
                name: 'Get All Queues',
                value: 'get-all-queues',
                action: 'Get all queues',
                description: 'Returns all queues in the specified domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/callqueues"}}',
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
        default: 'get-queue-info',
    },
    {
        displayName: 'Queue Number',
        name: 'queue',
        type: 'string',
        default: '',
        required: true,
        description: 'What is the extension number of the queue',
        displayOptions: {
            show: {
                operation: ['get-queue-info'],
            },
        },
    },
];