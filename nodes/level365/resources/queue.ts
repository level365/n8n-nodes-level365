import {
    INodeProperties,
} from 'n8n-workflow';

export const QueueOperations: INodeProperties[] = [
    {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        required: true,
        description: 'The domain of your account on Level365',
        default: '',
        displayOptions: {
            show: {
                resource: ['queue'],
            },
        },

        routing: {
            request: {
                url: '=domains/{{$value}}',

            }
        },

    },
];