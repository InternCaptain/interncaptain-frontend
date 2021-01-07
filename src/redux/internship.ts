import { Internship } from '../api/types/Internship';
import client from '../api/client';
import GetInternShipsQuery, { GetInternShipsData, GetInternShipsVars } from '../api/query/GetInternShipsQuery';
import { Action } from 'redux';

const SET_INTERNSHIPS = 'SET_INTERNSHIPS';

export interface InternshipState {
	internships: Internship[];
}

export interface InternshipAction  extends Action<string>{
	internships?: Internship[];
}

const initialInternshipState = {
	internships: []
};


const setInternships = (internships: Internship[]) => ({ type: SET_INTERNSHIPS, internships });

const fetchInternships = () => {
	return (dispatch: any) => {
		return client
			.query<GetInternShipsData, GetInternShipsVars>({
				query: GetInternShipsQuery,
				variables: {
					where: {
						recruiter: 12
					}
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setInternships(data.internships.nodes!!));
				}
			});
	};
};

const internshipReducer = (state: InternshipState = initialInternshipState, action: InternshipAction) => {
	const { type, internships } = action;
	switch (type) {
		case SET_INTERNSHIPS:
			return {
				...state,
				internships
			}
	}
	return state;
};

export default internshipReducer;