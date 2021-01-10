import React from 'react';
import { Card, CardContent, CardHeader, CardMedia } from '@material-ui/core';
import Profile from '../../api/types/Profile';
import { capitalizeFirstLetter } from '../../utils/utils';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import User from '../../api/types/User';

const useStyles = makeStyles(() =>
	createStyles({
		card: {
			maxWidth: '600px',
			margin: '10px',
			display: 'flex'
		}
	})
);

export interface ProfileDescriptionWidgetProperties {
	profile: Profile;
	currentUser: User;
}

const ProfileDescriptionWidget: React.FC<ProfileDescriptionWidgetProperties> = (properties) => {
	const classes = useStyles();

	const {
		profile: {
			description
		},
		currentUser: {
			firstName,
			lastName,
			email,
			profilePicture
		}
	} = properties;

	return (
		<Card key={'description'} className={classes.card}>
			<div>
				<CardHeader
					title={capitalizeFirstLetter(`${firstName} ${lastName}`)}
					subheader={email}
				/>
				<CardContent>
					{description}
				</CardContent>
			</div>
			<CardMedia image={profilePicture} title={'profilePicture'}/>
		</Card>
	);
};

export default ProfileDescriptionWidget;
