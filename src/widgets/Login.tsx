import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField } from '@material-ui/core';
import { LoginVars } from '../api/mutation/LoginMutation';
import ServerError from '../api/types/ServerError';
import AppState from '../redux/AppState';
import { login } from '../redux/user';
import { connect } from 'react-redux';

const useStyles = makeStyles(() =>
	createStyles({
		form: {
			width: '100%'
		},
		submit: {
			margin: '24px 0 16px'
		},
		link: {}
	})
);

export interface LoginProperties {
	onSubmit: (credentials: LoginVars) => void;
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
		setError(undefined);
	};

	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
		setError(undefined);
	};

	const handleSubmit = () => {
		onSubmit({
			email: email.trim(),
			password: password.trim()
		});
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
					required
					fullWidth
				/>
				<TextField
					onChange={handleChangePassword}
					value={password}
					label={'Password'}
					variant={'outlined'}
					type={'password'}
					margin={'normal'}
					error={error?.cause === 'password'}
					helperText={error?.cause === 'password' ? error.message : undefined}
					required
					fullWidth
				/>
				<Button onClick={handleSubmit} color="primary" variant="contained" className={classes.submit} fullWidth>
					{'Login'}
				</Button>
			</form>
			<Grid container>
				<Grid item xs>
					<Link component={RouterLink} to={'/recover'} underline={'none'}>
						{'Forgot password?'}
					</Link>
				</Grid>
				<Grid item>
					<Link component={RouterLink} to={'/register'} underline={'none'}>
						{'Register'}
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
	onSubmit: (credentials: LoginVars) => dispatch(login(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
