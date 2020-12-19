import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { createStyles, Grid, Paper, useMediaQuery } from '@material-ui/core';
import AppTitle from './AppTitile';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		page: {
			height: '100vh',
			backgroundColor: theme.palette.background.default
		},
		left: {
			backgroundColor: theme.palette.background.default,
			height: '100vh'
		},
		image: {
			height: '100vh',
			width: '100%',
			filter: theme.palette.type === 'dark' ? 'invert(100%) hue-rotate(75deg) contrast(80%) brightness(1.6)' : '',
			[theme.breakpoints.down('sm')]: {
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				position: 'absolute'
			}
		},
		right: {
			position: 'relative'
		},
		card: {
			backgroundColor: theme.palette.background.paper,
			padding: '25px',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			position: 'absolute',
			width: '50%',
			[theme.breakpoints.down('sm')]: {
				width: '70%'
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%'
			}
		}
	})
);

const PublicPage: React.FC = (properties: any) => {
	const { children } = properties;

	const classes = useStyles();

	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Grid container className={classes.page}>
			{sm ? (
				<Grid item xs={false} sm={false} md={6} className={classes.left}>
					<img src={'./jobs.jpg'} alt="jobs" className={classes.image} />
				</Grid>
			) : null}
			<Grid item xs={12} sm={12} md={6} className={classes.right}>
				<Paper className={classes.card}>
					<AppTitle fontSize={40} />
					{children}
				</Paper>
			</Grid>
		</Grid>
	);
};

export default PublicPage;
