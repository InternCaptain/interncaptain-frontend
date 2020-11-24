import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoginError } from '../types/errors';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField } from '@material-ui/core';
import { Credentials } from '../types/requests';

const useStyles = makeStyles((theme: Theme) =>
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
	onSubmit: (credentials: Credentials) => void;
	error?: LoginError;
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
		onSubmit({ email: email.trim(), password: password.trim() });
	};

	return (
		<>
			<form className={classes.form}>
				<TextField
					onChange={handleChangeEmail}
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

export default Login;
