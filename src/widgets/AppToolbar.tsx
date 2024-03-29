import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Icon, IconButton, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import AppTitle from './AppTitile';
import Menu from '@material-ui/core/Menu';
import browserHistory from '../routes/browserHistory';
import { clearToken, setCurrentUser } from '../redux/user';
import { connect } from 'react-redux';
import AppState from '../redux/AppState';
import User from '../api/types/User';
import ThemePicker from './ThemePicker';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

interface AppToolbarProperties {
	onLogout: () => void;
	currentUser: User;
}

const AppToolbar: React.FC<AppToolbarProperties> = (props) => {
	const classes = useStyles();

	const { onLogout, currentUser: { firstName, lastName, profilePicture } } = props;

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		onLogout();
		handleClose();
	};

	const handleProfile = () => {
		browserHistory.push('/Profile');
		handleClose();
	};

	const handleInternships = () => {
		browserHistory.push('/Internships');
		handleClose();
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="h6">
						<AppTitle fontSize={30} />
					</Typography>
					<div style={{ flexGrow: 1 }} />
					<div>
						{`${firstName} ${lastName}`}
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<img src={profilePicture} alt={'img'} style={{width: '40px', height: '40px'}}/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleProfile}>Profile</MenuItem>
							<MenuItem onClick={handleInternships}>Internships</MenuItem>
							<MenuItem onClick={handleLogout}>Log out</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	currentUser: state.userState.currentUser!!
});
const mapDispatchToProps = (dispatch) => ({
	onLogout: () => {
		dispatch(clearToken());
		dispatch(setCurrentUser(undefined));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
