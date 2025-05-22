import {
    INodeProperties,
} from 'n8n-workflow';

export const NumberOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['number'],
            },
        },
        options: [
            {
                name: 'Get Number Info',
                value: 'get-number-info',
                action: 'Get number info',
                description: 'Returns information about the specified phone number',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/phonenumbers/" + $parameter["number"]}}',
                        returnFullResponse: true,
                        ignoreHttpStatusErrors: true,
                    },
                },
            },
            {
                name: 'Get All Numbers',
                value: 'get-all-numbers',
                action: 'Get all numbers',
                description: 'Returns information about all phone numbers in the domain',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{"/domains/" + $parameter["domain"] + "/phonenumbers"}}',
                        returnFullResponse: true,
                        ignoreHttpStatusErrors: true,
                    },
                },
            },
        ],
        default: 'get-number-info',
    },
    {
        displayName: 'Phone Number',
        name: 'number',
        type: 'string',
        default: '',
        required: true,
        description: 'The phone number to retrieve information for',
        displayOptions: {
            show: {
                operation: ['get-number-info'],
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
                operation: ['get-all-numbers'],
            },
        },
        options: [
            {
                displayName: 'Include Details',
                name: 'include_details',
                type: 'boolean',
                default: false,
                description: 'Whether to include additional details about each phone number',
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: 'All',
                        value: 'all',
                    },
                    {
                        name: 'DID',
                        value: 'did',
                    },
                    {
                        name: 'Toll-Free',
                        value: 'tollfree',
                    },
                ],
                default: 'all',
                description: 'Filter numbers by type',
            },
        ],
    },
];