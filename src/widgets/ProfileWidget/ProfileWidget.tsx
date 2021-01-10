import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Profile, { ProfileSection, ProfileSectionEntry } from '../../api/types/Profile';
import ProfileSectionWidget from './ProfileSectionWidget';
import AppState from '../../redux/AppState';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { createSectionEntry, updateEntryInList, updateSectionInList } from './utils';
import User from '../../api/types/User';
import { fetchProfile } from '../../redux/profile';
import ProfileDescriptionWidget from './ProfileDescriptionWidget';

const useStyles = makeStyles(() =>
	createStyles({
		form: {
			width: '100%'
		},
		submit: {
			margin: '24px 0 16px'
		}
	})
);

interface ProfileWidgetProperties {
	profile: Profile;
	currentUser: User;
	onRequestProfile: (userId) => void;
	onSave: (profile: Profile) => void;
}

const ProfileWidget: React.FC<ProfileWidgetProperties> = (properties) => {
	const classes = useStyles();

	const { onSave, onRequestProfile, currentUser } = properties;
	const [profile, setProfile] = useState(properties.profile);
	const sections = profile === undefined ? [] : profile.sections;
	const { id } = currentUser;

	useEffect(() => {
		onRequestProfile(id);
	}, []);

	useEffect(() => {
		setProfile(properties.profile);
	}, [properties.profile]);

	const updateSection = updateSectionInList(sections);
	const updateEntry = (section: ProfileSection) => updateEntryInList(section.entries);

	const handleUpdateSection = (section: ProfileSection) => {
		setProfile({
			...profile,
			sections: updateSection(section)
		});
	};

	const handleAddEntry = (section: ProfileSection) => () => {
		const { entries } = section;
		handleUpdateSection({
			...section,
			entries: [...entries, createSectionEntry(section)]
		});
	};

	const handleUpdate = (section: ProfileSection) => (entry: ProfileSectionEntry) => {
		handleUpdateSection({
			...section,
			entries: updateEntry(section)(entry)
		});
	};

	const handleDelete = (section: ProfileSection) => (entry: ProfileSectionEntry) => {
		const { entries } = section;
		handleUpdateSection({
			...section,
			entries: entries.filter((item) => item.position !== entry.position)
		});
	};

	const handleSave = () => {
		onSave(profile);
	};

	return (
		<div className={classes.form}>
			<ProfileDescriptionWidget profile={profile} currentUser={currentUser} />
			{sections.map((section) => (
				<ProfileSectionWidget
					key={section.name}
					section={section}
					addEntry={handleAddEntry(section)}
					updateEntry={handleUpdate(section)}
					deleteEntry={handleDelete(section)}
				/>
			))}
			<Button onClick={handleSave}>Save</Button>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	profile: state.profileState.profile,
	currentUser: state.userState.currentUser
});

const mapDispatchToProps = (dispatch: any) => ({
	onSave: (profile) => console.log('onSave', profile),
	onRequestProfile: (userId) => dispatch(fetchProfile(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWidget);
