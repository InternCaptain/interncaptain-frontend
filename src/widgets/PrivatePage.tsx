import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import AppToolbar from './AppToolbar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		page: {
			height: '100vh',
			backgroundColor: theme.palette.background.default
		}
	})
);

const PrivatePage: React.FC = (properties: any) => {
	const { children } = properties;

	const classes = useStyles();

	return (
		<div>
			<AppToolbar />
			<div style={{ padding: 20 }}>{children}</div>
		</div>
	);
};

export default PrivatePage;
