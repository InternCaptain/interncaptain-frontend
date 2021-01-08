import { ThemeState } from './theme';
import { UserState } from './user';
import { InternshipState } from './internship';
import { CVState } from './CV';

export default interface AppState {
	themeState: ThemeState;
	userState: UserState;
	internshipState: InternshipState;
	CVState: CVState;
}
