import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import React, { useState } from 'react';
import { Icon, IconButton, InputAdornment, TextField } from '@material-ui/core';

const PasswordField = (props: TextFieldProps) => {
	const [inputType, setInputType] = useState<'password' | 'text'>('password');

	const onClick = () => {
		if (inputType === 'password') {
			setInputType('text');
		} else {
			setInputType('password');
		}
	};
	return (
		<TextField
			{...props}
			type={inputType}
			InputProps={{
				endAdornment: (
					<InputAdornment position={'end'} onClick={onClick}>
						<Icon>{inputType === 'password' ? 'visibility' : 'visibility_off'}</Icon>
					</InputAdornment>
				)
			}}
		/>
	);
};

export default PasswordField;
