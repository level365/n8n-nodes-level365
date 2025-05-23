import {
	deepCopy,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import parsePhoneNumber, {
	CountryCode,
	getCountries,
	isSupportedCountry,
} from 'libphonenumber-js/min';

export class PhoneNumberFormatter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Level365 - Phone Number Formatter',
		name: 'phoneNumberFormatter',
		icon: 'file:level365-utils.svg',
		group: ['transform'],
		version: 1,
		description: 'Format a phone number in multiple variations',
		defaults: {
			name: 'Phone Number Formatter',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [],
		properties: [
			{
				displayName: 'Keep Only Set',
				name: 'keepOnlySet',
				type: 'boolean',
				default: false,
				description:
					'Whether only the values set on this node should be kept and all others removed',
			},
			{
				displayName: 'Default Country',
				name: 'defaultCountry',
				type: 'options',
				required: true,
				options: getCountries().map((country) => ({
					name: country as string,
					value: country as string,
				})),
				default: '',
				description: 'Country of the phone number',
			},
			{
				displayName: 'Phone Number',
				name: 'phonenumber',
				type: 'string',
				required: true,
				description: 'The phone number to format',
				default: '',
				placeholder: '+1 555 555 1212',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		if (items.length === 0) {
			items.push({ json: {} });
		}

		const returnData: INodeExecutionData[] = [];

		let item: INodeExecutionData;
		let keepOnlySet: boolean;
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			keepOnlySet = this.getNodeParameter('keepOnlySet', itemIndex, false) as boolean;
			item = items[itemIndex];

			const newItem: INodeExecutionData = {
				json: {},
				pairedItem: item.pairedItem,
			};

			if (!keepOnlySet) {
				if (item.binary !== undefined) {
					newItem.binary = {};
					Object.assign(newItem.binary, item.binary);
				}
				newItem.json = deepCopy(item.json);
			}

			const number = this.getNodeParameter('phonenumber', itemIndex, '') as string | null;
			const defaultCountry = (
				(this.getNodeParameter('defaultCountry', itemIndex, '') as string | null) ?? ''
			).toUpperCase() as CountryCode;

			let phoneNumber = undefined;
			if (isSupportedCountry(defaultCountry)) {
				phoneNumber = parsePhoneNumber(`${number}`, defaultCountry);
			}

			newItem.json.country = phoneNumber?.country ?? '';
			newItem.json.countryCallingCode = phoneNumber?.countryCallingCode ?? '';
			newItem.json.nationalNumber = phoneNumber?.nationalNumber ?? '';

			newItem.json.formatNational = phoneNumber?.format('NATIONAL') ?? '';
			newItem.json.formatInternational = phoneNumber?.format('INTERNATIONAL') ?? '';
			newItem.json.formatE164 = phoneNumber?.format('E.164') ?? '';
			newItem.json.formatRFC3966 = phoneNumber?.format('RFC3966') ?? '';

			newItem.json.type = phoneNumber?.getType() ?? '';

			returnData.push(newItem);
		}

		return this.prepareOutputData(returnData);
	}
}
