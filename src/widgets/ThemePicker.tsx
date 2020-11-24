import { Icon, IconButton, Paper, Theme, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { setTheme } from '../redux/theme';
import { connect } from 'react-redux';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			display: 'flex'
		},
		picker: {
			display: 'flex'
		}
	})
);

interface ThemePickerButtonProperties {
	onClick: () => void;
	theme: Theme;
	currentTheme: Theme;
}

const ThemePickerButton: React.FC<ThemePickerButtonProperties> = (properties) => {
	const { theme, onClick, currentTheme } = properties;

	return (
		<ThemeProvider theme={theme}>
			<IconButton color="primary" onClick={onClick}>
				<Icon>
					{currentTheme.palette.primary.main === theme.palette.primary.main ? 'adjust' : 'panorama_fish_eye'}
				</Icon>
			</IconButton>
		</ThemeProvider>
	);
};

interface ThemePickerProperties {
	onSelectTheme: (theme: Theme) => void;
	themes: Theme[];
}

const ThemePicker: React.FC<ThemePickerProperties> = (properties) => {
	const { themes, onSelectTheme } = properties;
	const [visible, setVisible] = useState(false);

	const classes = useStyles();

	const currentTheme = useTheme();

	const handleClick = () => {
		setVisible(!visible);
	};

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.picker}>
				{visible ? (
					<div className={classes.wrapper}>
						{themes.map((theme) => (
							<ThemePickerButton
								key={`${theme.palette.primary.main}`}
								currentTheme={currentTheme}
								theme={theme}
								onClick={() => onSelectTheme(theme)}
							/>
						))}
						<IconButton color="primary" onClick={handleClick}>
							<Icon>cancel</Icon>
						</IconButton>
					</div>
				) : (
					<IconButton color="primary" onClick={handleClick}>
						<Icon>adjust</Icon>
					</IconButton>
				)}
			</Paper>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	themes: [lightTheme, darkTheme]
});
const mapDispatchToProps = (dispatch: any) => ({
	onSelectTheme: (theme: any) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker);
