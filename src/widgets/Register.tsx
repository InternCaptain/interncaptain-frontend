import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Link, TextField } from '@material-ui/core';
import ServerError from '../api/types/ServerError';
import AppState from '../redux/AppState';
import { register } from '../redux/user';
import { connect } from 'react-redux';
import PasswordField from './PasswordField';
import { UserForCreate } from '../api/types/User';
import browserHistory from '../routes/browserHistory';

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

export interface RegisterProperties {
	onSubmit: (user: UserForCreate) => void;
	error?: ServerError;
}

const Register: React.FC<RegisterProperties> = (properties) => {
	const classes = useStyles();

	const { onSubmit } = properties;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmationPassword, setConfirmationPassword] = useState('');
	const [error, setError] = useState(properties.error);

	useEffect(() => {
		setError(properties.error);
	}, [properties.error]);

	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value);
		setError(undefined);
	};

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
		setError(undefined);
	};

	const handleChangeConfirmationPassword = (event: any) => {
		setConfirmationPassword(event.target.value);
		setError(undefined);
	};

	const handleChangeFirstName = (event: any) => {
		setFirstName(event.target.value);
		setError(undefined);
	};

	const handleChangeLastName = (event: any) => {
		setLastName(event.target.value);
		setError(undefined);
	};

	const handleSubmit = () => {
		if (firstName === '') {
			setError({
				cause: 'firstName',
				message: 'Please type your first name'
			});
		} else if (lastName === '') {
			setError({
				cause: 'lastName',
				message: 'Please type your last name'
			});
		} else if (email === '') {
			setError({
				cause: 'email',
				message: 'Please type your email'
			});
		} else if (password === '') {
			setError({
				cause: 'password',
				message: 'Please type your password'
			});
		} else if (password !== confirmationPassword) {
			setError({
				cause: 'confirmationPassword',
				message: 'This value does not match the password'
			});
		} else {
			onSubmit({
				email: email.trim(),
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				password
			});
		}
	};

	return (
		<>
			<div className={classes.form}>
				<div style={{ display: 'flex' }}>
					<TextField
						onChange={handleChangeFirstName}
						value={firstName}
						label={'First Name'}
						variant={'outlined'}
						margin={'normal'}
						error={error?.cause === 'firstName'}
						helperText={error?.cause === 'firstName' ? error.message : undefined}
					/>
					<div style={{ flexGrow: 1, width: '10%' }} />
					<TextField
						onChange={handleChangeLastName}
						value={lastName}
						label={'Last Name'}
						variant={'outlined'}
						margin={'normal'}
						error={error?.cause === 'lastName'}
						helperText={error?.cause === 'lastName' ? error.message : undefined}
					/>
				</div>
				<TextField
					onChange={handleChangeEmail}
					value={email}
					label={'Email'}
					variant={'outlined'}
					margin={'normal'}
					error={error?.cause === 'email'}
					helperText={error?.cause === 'email' ? error.message : undefined}
					fullWidth
				/>
				<PasswordField
					onChange={handleChangePassword}
					value={password}
					label={'Password'}
					variant={'outlined'}
					type={'password'}
					margin={'normal'}
					error={error?.cause === 'password'}
					helperText={error?.cause === 'password' ? error.message : undefined}
					fullWidth
				/>
				<PasswordField
					onChange={handleChangeConfirmationPassword}
					value={confirmationPassword}
					label={'Confirm Password'}
					variant={'outlined'}
					type={'password'}
					margin={'normal'}
					error={error?.cause === 'confirmationPassword'}
					helperText={error?.cause === 'confirmationPassword' ? error.message : undefined}
					fullWidth
				/>
				<Button onClick={handleSubmit} color="primary" variant="contained" className={classes.submit} fullWidth>
					{'Register'}
				</Button>
			</div>
			<Link component={RouterLink} to={'/login'} underline={'none'}>
				{'Already have an account?'}
			</Link>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	error: state.userState.error
});

const mapDispatchToProps = (dispatch: any) => ({
	onSubmit: async (user: UserForCreate) => {
		await dispatch(register(user));
		browserHistory.replace('/login');
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
