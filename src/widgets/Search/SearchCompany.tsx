/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Company from '../../api/types/Company';
import { connect } from 'react-redux';
import { fetchCompanies, fetchInternships, updateInternshipQuery } from '../../redux/internship';

export interface SearchCompanyProperties {
	companies: Company[];
	onChange: (value: Company) => void;
	onRequestCompanies: () => void;
}

const useStyles = makeStyles({
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18
		}
	}
});

const SearchCompany: React.FC<SearchCompanyProperties> = (props) => {
	const classes = useStyles();
	const { companies, onRequestCompanies, onChange } = props;

	useEffect(() => onRequestCompanies(), []);

	return (
		<Autocomplete
			id="company-select"
			style={{ width: 300 }}
			options={companies}
			classes={{
				option: classes.option
			}}
			autoHighlight
			getOptionLabel={(option) => option.name}
			renderOption={(option) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Company"
					variant="outlined"
					inputProps={{
						...params.inputProps
					}}
				/>
			)}
			onChange={(event, value: Company) => {
				onChange(value);
			}}
		/>
	);
};


const mapStateToProps = (state) => {
	const comp = state.internshipState.companies;
	return {
		companies: comp.filter((c, index) => index === comp.findIndex((chestie) => chestie.name === c.name)),
		onChange: (value) => console.log(value)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestCompanies: () => dispatch(fetchCompanies()),
        onRequestInternships: () => dispatch(fetchInternships()),
        onChange: (company?: Company) => {
            dispatch(updateInternshipQuery('companyId', company?.id));
            dispatch(fetchInternships());
        }
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchCompany);
