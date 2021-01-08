import { Domain } from './Domain';
import Company from './Company';
import User from './User';

export interface Internship {
	id: number;
	company: Company;
	description: string;
	domain: Domain;
	positionName: string;
	recruiter: User;
}
