import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeParameterResourceLocator,
	INodeProperties,
	NodeOperationError,
} from 'n8n-workflow';
import { apiRequestPaginated } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Tag',
		name: 'tag',
		default: { mode: 'list', value: '' },
		description: 'Only return documents that have this tag',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['list'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				placeholder: `Select a Tag...`,
				type: 'list',
				typeOptions: {
					searchListMethod: 'tagSearch',
					searchFilterRequired: false,
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				placeholder: `Enter Tag ID...`,
				type: 'string',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '^[1-9][0-9]*$',
							errorMessage: 'The ID must be a positive integer',
						},
					},
				],
			},
		],
		placeholder: 'ID of the tag',
		required: false,
		type: 'resourceLocator',
	},
];

export async function execute(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<INodeExecutionData> {
	const endpoint = '/documents/';
	const tagId = (this.getNodeParameter('tag', itemIndex, {}) as INodeParameterResourceLocator)
		?.value as string | number | undefined;
	const query = tagId ? { 'tags__id': tagId } : undefined;
	const responses = (await apiRequestPaginated.call(
		this,
		itemIndex,
		'GET',
		endpoint,
		undefined,
		query,
	)) as any[];

	const statusCode =
		responses.reduce((acc, response) => acc + response.statusCode, 0) / responses.length;
	if (statusCode !== 200) {
		throw new NodeOperationError(
			this.getNode(),
			`The documents you are requesting could not be found`,
			{
				description: JSON.stringify(
					responses.map((response) => response?.body?.details ?? response?.statusMessage),
				),
			},
		);
	}
	return {
		json: { results: responses.map((response) => response.body.results).flat() },
	};
}
