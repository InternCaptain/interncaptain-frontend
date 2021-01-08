import { Action } from 'redux';
import { CVGroup, CVGroupEntry } from '../widgets/CVForm/Types';

const ADD_ENTRY = 'ADD_ENTRY';
const UPDATE_ENTRY = 'UPDATE_ENTRY';
const DELETE_ENTRY = 'DELETE_ENTRY';

export type CVState = CVGroup[];

interface CVAction extends Action<string> {
	groupName: string;
	entryId?: number;
	field?: string;
	newValue?: string;
}

export const addEntry = (groupName: string) => ({
	type: ADD_ENTRY,
	groupName
});
export const updateEntry = (groupName: string, entryId: number, field: string, newValue: string) => ({
	type: UPDATE_ENTRY,
	groupName,
	entryId,
	field,
	newValue
});
export const deleteEntry = (groupName: string, entryId: number) => ({
	type: DELETE_ENTRY,
	groupName,
	entryId
});

const initialCVState = [
	{
		name: 'education',
		fields: ['unit', 'years'],
		entries: [
			{
				id: 1,
				unit: 'UBB',
				years: '2017-2020'
			},
			{
				id: 2,
				unit: 'Liceu',
				years: '2013-2017'
			}
		]
	},
	{
		name: 'awards',
		fields: ['competition', 'award'],
		entries: [
			{
				id: 1,
				competition: 'Math Olympiad',
				award: '3rd Place'
			}
		]
	}
];

function createGroupEntry(fields: string[], entries: CVGroupEntry[]) {
	const newId = 1 + Math.max(...entries.map((entry) => entry.id));

	return Object.fromEntries([['id', newId], ...fields.map((field) => [field, ''])]);
}

const CVreducer = (state: CVState = initialCVState, action: CVAction) => {
	const { type, groupName, entryId, field, newValue } = action;
	switch (type) {
		case ADD_ENTRY:
			return state.map((group) => {
				if (group.name === groupName) {
					const { name, fields, entries } = group;
					return {
						name,
						fields,
						entries: [...entries, createGroupEntry(fields, entries)]
					};
				} else {
					return group;
				}
			});
		case UPDATE_ENTRY:
			return state.map((group) => {
				if (group.name === groupName) {
					const { name, fields, entries } = group;
					return {
						name,
						fields,
						entries: entries.map((entry) => {
							if (entry.id === entryId) {
								return {
									...entry,
									[field!!]: newValue!!
								};
							} else {
								return entry;
							}
						})
					};
				} else {
					return group;
				}
			});
		case DELETE_ENTRY:
			console.log(groupName);
			return state.filter((group) => {
				if (group.name === groupName) {
					const { name, fields, entries } = group;
					return {
						name,
						fields,
						entries: entries.filter((entry) => entry.id !== entryId)
					};
				} else {
					return group;
				}
			});
		default:
			return state;
	}
};

export default CVreducer;
