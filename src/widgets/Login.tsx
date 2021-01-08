import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField } from '@material-ui/core';
import ServerError from '../api/types/ServerError';
import AppState from '../redux/AppState';
import { login } from '../redux/user';
import { connect } from 'react-redux';
import PasswordField from './PasswordField';

const useStyles = makeStyles((theme) =>
	createStyles({
		form: {
			width: '100%'
		},
		submit: {
			margin: '24px 0 16px'
		}
	})
);

export interface LoginProperties {
	onSubmit: (email: string, password: string) => void;
	error?: ServerError;
}

const Login: React.FC<LoginProperties> = (properties) => {
	const classes = useStyles();

	const { onSubmit } = properties;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(properties.error);

	useEffect(() => {
		setError(properties.error);
	}, [properties.error]);

	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value);
		if (error && error.cause === 'email') setError(undefined);
	};

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
		if (error && error.cause === 'password') setError(undefined);
	};

	const handleSubmit = () => {
		if (email === '') {
			setError({
				cause: 'email',
				message: 'Please type your email'
			});
		} else if (password === '') {
			setError({
				cause: 'password',
				message: 'Please type your password'
			});
		} else {
			onSubmit(email.trim(), password);
		}
	};

	return (
		<>
			<form className={classes.form}>
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
				<Button onClick={handleSubmit} color="primary" variant="contained" className={classes.submit} fullWidth>
					Login
				</Button>
			</form>
			<Grid container>
				<Grid item xs>
					<Link component={RouterLink} to={'/recover'} underline={'none'}>
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link component={RouterLink} to={'/register'} underline={'none'}>
						Create an account
					</Link>
				</Grid>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	error: state.userState.error
});

const mapDispatchToProps = (dispatch: any) => ({
	onSubmit: (email: string, password: string) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
