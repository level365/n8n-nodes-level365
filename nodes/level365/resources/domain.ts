import {
    INodeProperties,
} from 'n8n-workflow';

export const DomainOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['domain'],
            },
        },
        options: [
            {
                name: 'Get Domain Info',
                value: 'get-domain-info',
                action: 'Get domain info',
                description: 'Returns information about the specified domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"]}}',
                        returnFullResponse: true,
                    },
                },
            },
            {
                name: 'Get Domain Info + Usage Info',
                value: 'get-domain-info-usage-info',
                action: 'Get domain info + usage info',
                description: 'Returns information about the specified domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/billing"}}',
                        returnFullResponse: true,
                    },
                },
            },
            {
                name: 'Check if Domain Exists',
                value: 'check-if-domain-exists',
                action: 'Check if domain exists',
                description: 'Returns information about the specified domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/count"}}',
                        returnFullResponse: true,
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ $response.body.total === 1 ? true : false }}'
                                },
                            },
                        ],
                    },
                },
            },

        ],
        default: 'get-domain-info',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Fields',
        displayOptions: {
            show: {
                operation: ['get-all-domains'],
            },
        },
        options: [
            {
                displayName: 'Include Details',
                name: 'include_details',
                type: 'boolean',
                default: false,
                description: 'Whether to include additional details about each domain',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: 'All',
                        value: 'all',
                    },
                    {
                        name: 'Active',
                        value: 'active',
                    },
                    {
                        name: 'Inactive',
                        value: 'inactive',
                    },
                ],
                default: 'all',
                description: 'Filter domains by status',
            },
        ],
    },
];