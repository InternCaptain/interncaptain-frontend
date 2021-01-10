import { Action } from 'redux';
import Profile, { ProfileSectionFieldKind } from '../api/types/Profile';
import client from '../api/client';
import GetProfilesQuery, { GetProfilesData, GetProfilesVars } from '../api/query/GetProfilesQuery';

export interface ProfileState {
	profile?: Profile;
}

interface ProfileAction extends Action<string> {
	profile: Profile;
}

const SET_PROFILE = 'SET_PROFILE';

const setProfile = (profile: Profile) => ({ type: SET_PROFILE, profile });

export const fetchProfile = (userId: number) => {
	return (dispatch: any) => {
		return client
			.query<GetProfilesData, GetProfilesVars>({
				query: GetProfilesQuery,
				variables: {
					userId
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setProfile(data.profiles[0]));
				}
			});
	};
};

const initialProfileState: ProfileState = {
	profile: undefined
};

const profileReducer = (state: ProfileState = initialProfileState, action: ProfileAction) => {
	const { type, profile } = action;
	if (type === SET_PROFILE) {
		return {
			profile
		};
	} else {
		return state;
	}
};

export default profileReducer;
