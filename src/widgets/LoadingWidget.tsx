import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, LinearProgress } from '@material-ui/core';
import AppTitle from './AppTitile';

const useStyles = makeStyles(() =>
	createStyles({
		box: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)'
		}
	})
);

const LoadingWidget: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.box}>
			<AppTitle fontSize={80} />
			<LinearProgress />
		</div>
	);
};

export default LoadingWidget;
