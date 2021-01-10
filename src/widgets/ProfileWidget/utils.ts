import { ProfileSection, ProfileSectionEntry } from '../../api/types/Profile';
import { updateItemInList } from '../../utils/utils';

export const createSectionEntry = (section: ProfileSection): ProfileSectionEntry => {
	const { fields, entries } = section;

	const position = 1 + Math.max(0, ...entries.map((entry) => entry.position));

	return {
		id: 0,
		position,
		data: fields.map((field) => ({
			name: field.name,
			value: ''
		}))
	};
};

export const getActualField = (field: string) => (obj: any) => obj[field];

export const getId = getActualField('id');
export const getName = getActualField('name');
export const getPosition = getActualField('position');

export const updateSectionInList = updateItemInList<ProfileSection, String>(getName);
export const updateEntryInList = updateItemInList<ProfileSectionEntry, String>(getPosition);
