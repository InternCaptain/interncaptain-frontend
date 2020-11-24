import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { createStyles, Grid, Paper, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import ThemePicker from '../widgets/ThemePicker';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		page: {
			height: '100vh',
			backgroundColor: theme.palette.background.default
		},
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			placeContent: 'center'
		},
		titlePrimary: {
			color: theme.palette.primary.main
		},
		titleSecondary: {
			color: theme.palette.text.secondary
		},
		title: {
			fontFamily: "'Permanent Marker', cursive",
			fontSize: '50px'
		},
		titleIcon: {
			height: '70px',
			width: '70px'
		},
		left: {
			backgroundColor: theme.palette.background.default,
			height: '100vh'
		},
		image: {
			height: '100vh',
			width: '100%'
		},
		card: {
			backgroundColor: theme.palette.background.paper,
			padding: '35px',
			top: '50%',
			transform: 'translate(0, -60%)',
			position: 'absolute'
		},
		right: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
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
					<div className={classes.titleWrapper}>
						<div className={clsx(classes.title, classes.titlePrimary)}>Intern</div>
						<div className={clsx(classes.title, classes.titleSecondary)}>Captain</div>
						<img className={classes.titleIcon} src={'captain.png'} alt="Captain" />
					</div>
					{children}
				</Paper>
				<ThemePicker />
			</Grid>
		</Grid>
	);
};

export default PublicPage;
