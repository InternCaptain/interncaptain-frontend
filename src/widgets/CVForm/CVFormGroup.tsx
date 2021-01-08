import React from 'react';
import { Icon, IconButton, TextField } from '@material-ui/core';
import { CVGroupEntry } from './Types';

export interface CVFormGroupProperties {
	name: string;
	fields: string[];
	entries: CVGroupEntry[];
	addEntry: () => void;
	updateEntry: (entryId: number, field: string, newValue: string) => void;
	deleteEntry: (entryId: number) => void;
}

function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

const CVFormGroup: React.FC<CVFormGroupProperties> = (properties) => {
	const { name, entries, fields, addEntry, updateEntry, deleteEntry } = properties;

	const handleUpdate = (entryId: number, field: string) => (event: any) => {
		updateEntry(entryId, field, event.target.value);
	};

	const handleDelete = (entryId: number) => () => {
		deleteEntry(entryId);
	};

	return (
		<div key={name} style={{ maxWidth: '600px' }}>
			<div style={{ display: 'flex', width: '100%' }}>
				<div style={{ flexGrow: 1 }}>{capitalizeFirstLetter(name)}</div>
				<IconButton onClick={addEntry} color="primary">
					<Icon>add</Icon>
				</IconButton>
			</div>
			<table style={{ width: '100%' }}>
				<thead>
					<tr>
						{fields.map((field) => (
							<th key={field}>{capitalizeFirstLetter(field)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.id}>
							<td>{entry.id}</td>
							{fields.map((field) => (
								<td key={`${field}-${entry[field]}`}>
									<TextField
										value={entry[field]}
										variant={'outlined'}
										size={'small'}
										onChange={handleUpdate(entry.id, field)}
									/>
								</td>
							))}
							<td>
								<IconButton onClick={handleDelete(entry.id)}>
									<Icon>remove</Icon>
								</IconButton>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CVFormGroup;
