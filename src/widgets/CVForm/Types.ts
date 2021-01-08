export type CVGroupEntry = {
	id: number;
} & {
	[key: string]: string | number;
};

export interface CVGroup {
	name: string;
	fields: string[];
	entries: CVGroupEntry[];
}
