import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import AppTitle from './AppTitile';
import Search from './Search';
import SearchCompany from './Search/SearchCompany';
import Company from '../api/types/Company';
import SearchPosition from './Search/SearchPosition';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

const AppToolbar = () => {
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

export default AppToolbar;
