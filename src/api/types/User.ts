import { UserRole } from './UserRole';

export default interface User {
	id: number;
	email?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
	role: UserRole;
}

export interface UserForCreate {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
