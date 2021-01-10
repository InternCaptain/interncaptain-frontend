import { Internship } from '../api/types/Internship';
import client from '../api/client';
import GetInternShipsQuery, { GetInternShipsData, GetInternShipsVars } from '../api/query/GetInternShipsQuery';
import { Action } from 'redux';
import GetCompaniesQuery, { GetCompaniesData, GetCompaniesVars } from '../api/query/GetCompaniesQuery';
import Company from '../api/types/Company';
import GetApplicationsQuery, { GetApplicationsData, GetApplicationsVars } from '../api/query/GetApplicationsQuery';
import Application from '../api/types/Application';
import { ApplicationStatus } from '../api/types/ApplicationStatus';
import UpdateApplicationStatusMutation, {
	UpdateApplicationStatusData,
	UpdateApplicationStatusVars
} from '../api/mutation/UpdateApplicationStatusMutation';
import AddApplicationMutation, { AddApplicationData, AddApplicationVars } from '../api/mutation/AddApplicationMutation';

const SET_INTERNSHIPS = 'SET_INTERNSHIPS';
const SET_COMPANIES = 'SET_COMPANIES';
const SET_APPLICATIONS = 'SET_APPLICATIONS';
const SET_APPLICATION_STATUS = 'SET_APPLICATION_STATUS';
const ADD_APPLICATION = 'ADD_APPLICATION';
const UPDATE_INTERNSHIPS_QUERY = 'UPDATE_INTERNSHIPS_QUERY';

export interface InternshipState {
	internships: Internship[];
	companies: Company[];
	applications: Application[];
	query: any;
}

export interface InternshipAction extends Action<string> {
	internships?: Internship[];
	companies?: Company[];
	applications?: Application[];
	applicationId: number;
	newStatus: ApplicationStatus;
	applicationToAdd: Application;
	key: string;
	value: any;
}

const initialInternshipState = {
	internships: [],
	companies: [],
	applications: [],
	query: {}
};

const setInternships = (internships: Internship[]) => ({ type: SET_INTERNSHIPS, internships });
const setCompanies = (companies: Company[]) => ({ type: SET_COMPANIES, companies });
const setApplications = (applications: Application[]) => ({ type: SET_APPLICATIONS, applications });
const setApplicationStatus = (applicationId: number, newStatus: ApplicationStatus) => ({
	type: SET_APPLICATION_STATUS,
	applicationId,
	newStatus
});
const addApplication = (applicationToAdd: Application) => ({ type: ADD_APPLICATION, applicationToAdd });
export const updateInternshipQuery = (key: string, value: any) => ({ type: UPDATE_INTERNSHIPS_QUERY, key, value });

function hasValidKeys(where) {
	return Object.entries(where).filter(l => l[1] !== undefined).length > 0;
}

function getValidKeys(where) {
	return Object.fromEntries(Object.entries(where).filter(l => l[1] !== undefined));
}

export const fetchInternships = () => {
	return (dispatch: any, getState) => {
		const where = getState().internshipState.query;
		console.log(where);
		return client
			.query<GetInternShipsData, GetInternShipsVars>({
				query: GetInternShipsQuery,
				variables: {
					[hasValidKeys(where) && 'where']: {
						...getValidKeys(where)
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

export const fetchCompanies = () => {
	return (dispatch: any) => {
		return client
			.query<GetCompaniesData, GetCompaniesVars>({
				query: GetCompaniesQuery,
				variables: {}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setCompanies(data.companies.nodes!!));
				}
			});
	};
};

export const fetchApplications = (where) => {
	return (dispatch: any) => {
		return client
			.query<GetApplicationsData, GetApplicationsVars>({
				query: GetApplicationsQuery,
				variables: {
					where
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setApplications(data.applications.nodes!!));
				}
			});
	};
};

export const updateApplicationStatus = (applicationId: number, newStatus: ApplicationStatus) => {
	return (dispatch: any) => {
		return client
			.mutate<UpdateApplicationStatusData, UpdateApplicationStatusVars>({
				mutation: UpdateApplicationStatusMutation,
				variables: {
					applicationId,
					newStatus
				}
			})
			.then((response) => {
				dispatch(setApplicationStatus(applicationId, response.data.updateApplicationStatus.status));
			})
			.catch((error) => {});
	};
};

export const fetchAddApplication = (internshipId: number, studentId: number) => {
	return (dispatch: any) => {
		return client
			.mutate<AddApplicationData, AddApplicationVars>({
				mutation: AddApplicationMutation,
				variables: {
					internshipId,
					studentId
				}
			})
			.then((response) => {
				dispatch(addApplication(response.data.addApplication));
			})
			.catch((error) => {

			});
	}
}

const internshipReducer = (state: InternshipState = initialInternshipState, action: InternshipAction) => {
	const { type, internships, companies, applications, applicationId, newStatus, applicationToAdd, key, value } = action;

	switch (type) {
		case SET_INTERNSHIPS:
			return {
				...state,
				internships
			};
		case SET_COMPANIES:
			return {
				...state,
				companies
			};
		case SET_APPLICATIONS:
			if (applications.length > 0) {
				return {
					...state,
					applications: [
						...state.applications.filter(
							(application) =>
								applications!!.find((a) => a.internship.id !== application.internship.id) &&
								applications!!.find((a) => a.student.id !== application.student.id)
						),
						...applications
					]
				};
			} else {
				return state;
			}
		case SET_APPLICATION_STATUS:
			return {
				...state,
				applications: [
					...state.applications.map((application) => {
						if (application.id === applicationId)
							return {
								...application,
								status: newStatus
							};
						else
							return application;
					})
				]
			};
		case ADD_APPLICATION:
			return {
				...state,
				applications: state.applications.concat(applicationToAdd)
			};
		case UPDATE_INTERNSHIPS_QUERY:
			return {
				...state,
				query: {
					...state.query,
					[key !== undefined && key]: value
				}
			};
	}
	return state;
};

export default internshipReducer;
