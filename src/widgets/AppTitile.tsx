import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		titleWrapper: {
			display: 'flex',
			alignItems: 'center',
			placeContent: 'center'
		},
		titleText: {
			fontFamily: "'Permanent Marker', cursive",
			fontSize: (props: AppTitleProperties) => `${props.fontSize!!}px`
		},
		titleTextPrimary: {
			color: theme.palette.primary.main
		},
		titleTextSecondary: {
			color: theme.palette.text.secondary
		},
		titleIcon: {
			height: (props: AppTitleProperties) => `${1.4 * props.fontSize!!}px`,
			width: (props: AppTitleProperties) => `${1.4 * props.fontSize!!}px`
		}
	})
);

interface AppTitleProperties {
	fontSize?: number;
}

const AppTitle = (properties: AppTitleProperties) => {
	const classes = useStyles({ fontSize: 50, ...properties });

	return (
		<div className={classes.titleWrapper}>
			<div className={clsx(classes.titleText, classes.titleTextPrimary)}>Intern</div>
			<div className={clsx(classes.titleText, classes.titleTextSecondary)}>Captain</div>
			<img className={classes.titleIcon} src={'captain.png'} alt="Captain" />
		</div>
	);
};

export default AppTitle;
