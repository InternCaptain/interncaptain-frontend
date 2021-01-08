import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import AppTitle from './AppTitile';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

export default function AppToolbar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="h6">
						<AppTitle fontSize={30} />
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}