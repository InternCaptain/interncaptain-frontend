import { Domain } from './Domain';

export interface Internship {
	companyId: number;
	description: string;
	domain: Domain;
	id: number;
	positionName: string;
}
