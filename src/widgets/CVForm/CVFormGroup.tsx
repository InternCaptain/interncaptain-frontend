import React, { useState } from 'react';
import { Icon, IconButton, TextField } from '@material-ui/core';
import { CVGroupEntry } from './Types';
import { capitalizeFirstLetter } from '../../utils/utils';

export interface CVFormGroupProperties {
	name: string;
	fields: string[];
	entries: CVGroupEntry[];
	addEntry: () => void;
	updateEntry: (entryId: number, field: string, newValue: string) => void;
	deleteEntry: (entryId: number) => void;
}

const CVFormGroup: React.FC<CVFormGroupProperties> = (properties) => {
	const { name, fields, addEntry, updateEntry, deleteEntry } = properties;

	const [entries, setEntries] = useState(properties.entries);

	const handleInput = (entryId: number, field: string) => (event: any) => {
		setEntries(entries.map((entry) => {
			if (entry.id === entryId) {
				return {
					...entry,
					[field!!]: event.target.value!!
				};
			} else {
				return entry;
			}
		}));
	};

	const handleUpdate = (entryId: number, field: string) => () => {
		updateEntry(entryId, field, entries.filter(e => e.id === entryId)[field]);
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
					<th />
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
									onChange={handleInput(entry.id, field)}
									onPointerOut={handleUpdate(entry.id, field)}
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
