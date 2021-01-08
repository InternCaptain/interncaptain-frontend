import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CVGroup } from './Types';
import CVFormGroup from './CVFormGroup';
import AppState from '../../redux/AppState';
import { addEntry, deleteEntry, updateEntry } from '../../redux/CV';
import { connect } from 'react-redux';

const useStyles = makeStyles(() =>
	createStyles({
		form: {
			width: '100%'
		},
		submit: {
			margin: '24px 0 16px'
		}
	})
);

interface CVFormProperties {
	groups: CVGroup[];
	addEntry: (groupName: string) => void;
	updateEntry: (groupName: string, entryId: number, field: string, newValue: string) => void;
	deleteEntry: (groupName: string, entryId: number) => void;
}

const CVForm: React.FC<CVFormProperties> = (properties) => {
	const classes = useStyles();

	const { groups, addEntry, updateEntry, deleteEntry } = properties;

	const handleAdd = (group: CVGroup) => () => {
		addEntry(group.name);
	};

	const handleUpdate = (group: CVGroup) => (entryId: number, field, newValue) => {
		updateEntry(group.name, entryId, field, newValue);
	};

	const handleDelete = (group: CVGroup) => (entryId) => {
		deleteEntry(group.name, entryId);
	};

	return (
		<form className={classes.form}>
			{groups.map((group) => (
				<CVFormGroup
					key={group.name}
					name={group.name}
					fields={group.fields}
					entries={group.entries}
					addEntry={handleAdd(group)}
					updateEntry={handleUpdate(group)}
					deleteEntry={handleDelete(group)}
				/>
			))}
		</form>
	);
};

const mapStateToProps = (state: AppState) => ({
	groups: state.CVState || []
});

const mapDispatchToProps = (dispatch: any) => ({
	addEntry: (groupName: string) => dispatch(addEntry(groupName)),
	updateEntry: (groupName: string, entryId: number, field: string, newValue: string) =>
		dispatch(updateEntry(groupName, entryId, field, newValue)),
	deleteEntry: (groupName: string, entryId: number) => dispatch(deleteEntry(groupName, entryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CVForm);
