import React from 'react';
import { User } from '../api/types/User';
import AppState from '../redux/AppState';
import { fetchUsers } from '../redux/user';
import { connect } from 'react-redux';
import UserWidget from './UserWidget';

interface UsersProperties {
	users: User[];
	onClick: () => void;
}

const Users = (properties: UsersProperties) => {
	const { users, onClick } = properties;

	if (users.length === 0) {
		return <button onClick={onClick}>Fetch!</button>;
	} else {
		return (
			<div style={{ display: 'flex' }}>
				Users:
				{users.map((user) => (
					<div key={user.id} style={{ textAlign: 'center' }}>
						{user.firstName} {user.lastName}
						<UserWidget backgroundImage={user.profilePicture!!} />
					</div>
				))}
			</div>
		);
	}
};

const mapStateToProps = (state: AppState) => ({
	users: state.userState.users
});

const mapDispatchToProps = (dispatch: any) => ({
	onClick: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
