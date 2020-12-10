import { ThemeState } from './theme';
import { UserState } from './user';

export default interface AppState {
	themeState: ThemeState;
	userState: UserState;
}
