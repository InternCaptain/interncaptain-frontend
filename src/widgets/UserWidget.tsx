import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Icon, IconButton, Paper } from '@material-ui/core';

const images = [
	'https://i.pinimg.com/474x/34/3e/ff/343effc1820cbef100456111157ea268.jpg',
	'https://images.unsplash.com/photo-1605020799108-17f052ed5cb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
	'https://images.unsplash.com/photo-1605207838129-6fa4368cfb9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
	'https://images.unsplash.com/photo-1604364721460-0cbc5866219d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
	'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
	'https://images.unsplash.com/photo-1581093585713-d6093e4861ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
	'https://images.unsplash.com/photo-1600349641806-a57ccbadf7d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
	'https://images.unsplash.com/photo-1548454782-15b189d129ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
	'https://images.unsplash.com/photo-1582015752624-e8b1c75e3711?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
	'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
];

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

const UserWidgets = () => (
	<div style={{ display: 'flex' }}>
		{images.map((image) => (
			<UserWidget backgroundImage={image} />
		))}
	</div>
);

export default UserWidgets;
