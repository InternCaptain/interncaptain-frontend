export default interface User {
	id: number;
	email?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
}

export interface UserForCreate {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
