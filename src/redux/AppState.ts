import { ThemeState } from './theme';
import { UserState } from './user';
import { InternshipState } from './internship';

export default interface AppState {
	themeState: ThemeState;
	userState: UserState;
	internshipState: InternshipState;
}
