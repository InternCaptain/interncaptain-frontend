import { Internship } from '../api/types/Internship';
import client from '../api/client';
import GetInternShipsQuery, { GetInternShipsData, GetInternShipsVars } from '../api/query/GetInternShipsQuery';
import { Action } from 'redux';
import GetCompaniesQuery, { GetCompaniesData, GetCompaniesVars } from '../api/query/GetCompaniesQuery';
import Company from '../api/types/Company';
import GetApplicationsQuery, { GetApplicationsData, GetApplicationsVars } from '../api/query/GetApplicationsQuery';
import Application from '../api/types/Application';

const SET_INTERNSHIPS = 'SET_INTERNSHIPS';
const SET_COMPANIES = 'SET_COMPANIES';
const SET_APPLICATIONS = 'SET_APPLICATIONS';

export interface InternshipState {
	internships: Internship[];
	companies: Company[];
	applications: Application[];
}

export interface InternshipAction extends Action<string> {
	internships?: Internship[];
	companies?: Company[];
	applications?: Application[];
}

const initialInternshipState = {
	internships: [],
	companies: [],
	applications: []
};

const setInternships = (internships: Internship[]) => ({ type: SET_INTERNSHIPS, internships });
const setCompanies = (companies: Company[]) => ({ type: SET_COMPANIES, companies });
const setApplications = (applications: Application[]) => ({ type: SET_APPLICATIONS, applications });

export const fetchInternships = (recruiter?: number) => {
	return (dispatch: any) => {
		return client
			.query<GetInternShipsData, GetInternShipsVars>({
				query: GetInternShipsQuery,
				variables: {
					where: {
						recruiter
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

export const fetchCompanies = (company?: number) => {
	return (dispatch: any) => {
		return client
			.query<GetCompaniesData, GetCompaniesVars>({
				query: GetCompaniesQuery,
				variables: {
					where: {
						company
					}
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setCompanies(data.companies.nodes!!));
				}
			})
	}
}

export const fetchApplications = (internship?: number) => {
	return (dispatch: any) => {
		return client
			.query<GetApplicationsData, GetApplicationsVars>({
				query: GetApplicationsQuery,
				variables: {
					where: {
						internship
					}
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setApplications(data.applications.nodes!!));
				}
			})
	}
}

const internshipReducer = (state: InternshipState = initialInternshipState, action: InternshipAction) => {
	const { type, internships, companies, applications } = action;
	switch (type) {
		case SET_INTERNSHIPS:
			return {
				...state,
				internships
			}
		case SET_COMPANIES:
			return {
				...state,
				companies
			}
		case SET_APPLICATIONS:
			return {
				...state,
				applications
			}
	}
	return state;
};

export default internshipReducer;
