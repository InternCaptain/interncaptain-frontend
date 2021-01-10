export default interface Profile {
	description: string;
	sections: ProfileSection[];
}

export interface ProfileSection {
	name: string;
	position: number;
	fields: ProfileSectionField[];
	entries: ProfileSectionEntry[];
}

export interface ProfileSectionField {
	name: string;
	kind: ProfileSectionFieldKind;
}

export enum ProfileSectionFieldKind {
	STRING = 'STRING',
	NUMBER = 'NUMBER',
	DATE = 'DATE',
	CUSTOM = 'CUSTOM'
}

export type ProfileSectionEntry = {
	id: number;
	position: number;
	data: ProfileSectionEntryData[]
};


export interface ProfileSectionEntryData {
	name: string;
	value: string;
}
