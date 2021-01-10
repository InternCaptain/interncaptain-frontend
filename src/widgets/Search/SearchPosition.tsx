/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppState from '../../redux/AppState';

export interface SearchPositionProperties {
	positions: string[];
	onChange: (value: string) => void;
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

const SearchPosition = (props: SearchPositionProperties) => {
	const classes = useStyles();

	return (
		<Autocomplete
			id="position-select"
			style={{ width: 300 }}
			options={props.positions}
			classes={{
				option: classes.option
			}}
			autoHighlight
			getOptionLabel={(option) => option}
			renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Choose a position"
					variant="outlined"
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password' // disable autocomplete and autofill
					}}
				/>
			)}
			onChange={(event, value) => {
				props.onChange(value);
			}}
		/>
	);
};

const mapStateToProps = (state: AppState) => {
	return {
		positions: [...new Set(state.internshipState.internships.map((internship) => internship.positionName))],
		onChange: (value) => console.log(value)
	};
};

export default connect(mapStateToProps)(SearchPosition);