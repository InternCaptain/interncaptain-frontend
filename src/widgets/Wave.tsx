import React from 'react';
import { Paper, useTheme } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			width: '100px',
			height: '100px',
			backgroundColor: theme.palette.primary.dark
		}
	})
);

const Wave = () => {
	const classes = useStyles();
	const theme = useTheme();
	return <div>Hello</div>;
};

export default Wave;
