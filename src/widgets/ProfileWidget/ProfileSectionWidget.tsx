import React from 'react';
import { Card, CardContent, CardHeader, Icon, IconButton, TextField, Typography } from '@material-ui/core';
import { ProfileSection, ProfileSectionEntry, ProfileSectionField } from '../../api/types/Profile';
import { capitalizeFirstLetter } from '../../utils/utils';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
	createStyles({
		card: {
			maxWidth: '600px',
			margin: '10px'
		},
		table: {
			width: '100%'
		},
		th: {
			textAlign: 'center'
		},
		td: {
			textAlign: 'center'
		}
	})
);

export interface ProfileSectionWidgetProperties {
	section: ProfileSection;
	addEntry: () => void;
	updateEntry: (entry: ProfileSectionEntry) => void;
	deleteEntry: (entry: ProfileSectionEntry) => void;
}

const ProfileSectionWidget: React.FC<ProfileSectionWidgetProperties> = (properties) => {
	const classes = useStyles();

	const { section, addEntry, updateEntry, deleteEntry } = properties;

	const { name, fields, entries } = section;

	const handleAddEntry = () => {
		addEntry();
	};

	const handleUpdateEntry = (entry: ProfileSectionEntry, field: ProfileSectionField) => event => {
		const { data } = entry;
		const { name } = field;
		const { value } = event.target;
		data.map(item => {
			if (item.name === name) {
				return {
					name, value
				};
			} else {
				return item;
			}
		});
		updateEntry({
			...entry,
			data: data.map(item => {
				if (item.name === name) {
					return {
						name, value
					};
				} else {
					return item;
				}
			})
		});
	};

	const handleDeleteEntry = (entry: ProfileSectionEntry) => () => {
		deleteEntry(entry);
	};

	const getValue = (entry: ProfileSectionEntry, field: ProfileSectionField) => {
		return entry.data.find(data => data.name === field.name)!!.value;
	};

	return (
		<Card key={name} className={classes.card}>
			<CardHeader title={capitalizeFirstLetter(name)} />
			<CardContent>
				<table className={classes.table}>
					<thead>
					<tr>
						{fields.map((field) => (
							<th key={field.name} className={classes.th}>
								<Typography>{capitalizeFirstLetter(field.name)}</Typography>
							</th>
						))}
						<th key={'button'} className={classes.th}>
							<IconButton onClick={handleAddEntry} color="primary">
								<Icon>add</Icon>
							</IconButton>
						</th>
					</tr>
					</thead>
					<tbody>
					{
						entries.map((entry) => (
							<tr key={entry.position}>
								{
									fields.map((field) => (
										<td key={field.name} className={classes.td}>
											<TextField
												value={getValue(entry, field)}
												variant={'outlined'}
												size={'small'}
												onChange={handleUpdateEntry(entry, field)}
											/>
										</td>
									))
								}
								<td className={classes.td}>
									<IconButton onClick={handleDeleteEntry(entry)}>
										<Icon>remove</Icon>
									</IconButton>
								</td>
							</tr>

						))
					}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
};

export default ProfileSectionWidget;
