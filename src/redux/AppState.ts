import { ThemeState } from './theme';
import { UserState } from './user';
import { InternshipState } from './internship';
import { ProfileState } from './profile';

export default interface AppState {
	themeState: ThemeState;
	userState: UserState;
	internshipState: InternshipState;
	profileState: ProfileState;
}
