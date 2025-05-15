import {
    INodeProperties,
} from 'n8n-workflow';

export const DialPlanOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['dialplan'],
            },
        },
        options: [
            {
                name: 'Get Dial Plan',
                value: 'get-dialplan',
                action: 'Get dial plan',
                description: 'Returns information about a specific dial plan',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/dialplans/" + $parameter["dialplan"] + "/dialrules/" + $parameter["dialplan_id"]}}',
                    },
                },
            },
            {
                name: 'Get All Dial Plans',
                value: 'get-all-dialplans',
                action: 'Get all dial plans',
                description: 'Returns information about all dial plans in the domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/dialplans/" + $parameter["dialplan"] + "/dialrules"}}',
                    },
                },
            },
        ],
        default: 'get-dialplan',
    },
    {
        displayName: 'Dial Plan ID',
        name: 'dialplan_id',
        type: 'string',
        default: '',
        required: true,
        description: 'The ID of the dial plan to retrieve',
        displayOptions: {
            show: {
                operation: ['get-dialplan'],
            },
        },
    },
    {
        displayName: 'Dial Plan',
        name: 'dialplan',
        type: 'string',
        default: '',
        required: true,
        description: 'The ID of the dial plan to retrieve',
        displayOptions: {
            show: {
                operation: ['get-dialplan', 'get-all-dialplans'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Add Fields',
        displayOptions: {
            show: {
                operation: ['get-all-dialplans'],
            },
        },
        options: [
            {
                displayName: 'Include Details',
                name: 'include_details',
                type: 'boolean',
                default: false,
                description: 'Whether to include additional details about each dial plan',
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
                description: 'Filter dial plans by status',
            },
        ],
    },
];