import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Icon, IconButton, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			position: 'relative',
			width: '80px',
			height: '80px',
			margin: '10px',
			borderRadius: '50%',
			'&:hover $image': {
				filter: 'grayscale(1) blur(2px)'
			},
			'&:hover $overlay': {
				height: '100%'
			}
		},
		image: {
			display: 'block',
			borderRadius: '50%',
			width: '100%',
			height: '100%',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundImage: (props: any) => `url("${props.backgroundImage}")`
		},
		overlay: {
			borderRadius: '50%',
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			overflow: 'hidden',
			width: '100%',
			height: '0'
		},
		button: {
			top: '50%',
			left: '50%',
			position: 'absolute',
			overflow: 'hidden',
			transform: 'translate(-50%, -50%)',
			color: theme.palette.primary.main
		}
	})
);

const UserWidget = ({ backgroundImage }: { backgroundImage: string }) => {
	const { button, overlay, container, image } = useStyles({
		backgroundImage
	});
	return (
		<Paper className={container}>
			<Paper className={image} />
			<div className={overlay}>
				<IconButton className={button}>
					<Icon fontSize={'large'}>settings</Icon>
				</IconButton>
			</div>
		</Paper>
	);
};

export default UserWidget;
