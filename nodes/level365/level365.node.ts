import { INodeType, INodeTypeDescription, NodeConnectionType, } from 'n8n-workflow';
import { CallOperations } from './resources/call';
import { QueueOperations } from './resources/queue';
import { UserOperations } from './resources/user';
import { NumberOperations } from './resources/number';
import { DialPlanOperations } from './resources/dialplan';
import { DomainOperations } from './resources/domain';

export class level365 implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        displayName: 'Level365',
        name: 'level365',
        icon: 'file:level365.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from Level365s API',
        defaults: {
            name: 'Level365',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'level365Api',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.365sip.com/ns-api/v2',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: `This node is for Level365 clients only.  This node requires an active subscription to use.<br/>
                   <a href="https://www.level365.com" target="_blank">Visit this page</a> for more information.`,
                name: 'notice',
                type: 'notice',
                default: '',
            },
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                required: true,
                description: 'The domain of your account on Level365. A ~ character will be replaced with your domain name in most cases.',
                default: '~',
                hint: 'Enter your domain here. A ~ character will be replaced with your domain name in most cases.',
                routing: {
                    request: {
                        url: '=/domains/{{$value}}',

                    }
                },
            },
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                hint: 'Select the resource you want to retrieve.',
                options: [
                    {
                        name: 'Call',
                        value: 'call',
                    },
                    {
                        name: 'Dial Plan',
                        value: 'dialplan',
                    },
                    {
                        name: 'Domain',
                        value: 'domain',
                    },
                    {
                        name: 'Phone Number',
                        value: 'number',
                    },
                    {
                        name: 'Queue',
                        value: 'queue',
                    },
                    {
                        name: 'User',
                        value: 'user',
                    },
                ],
                default: 'user',
                // routing: {
                // 	send: {
                // 		preSend: [debugRequest],
                // 	},
                // },
            },
            ...CallOperations,
            ...DialPlanOperations,
            ...NumberOperations,
            ...QueueOperations,
            ...UserOperations,
            ...DomainOperations,

        ]

    };
}