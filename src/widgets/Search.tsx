import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.common.white,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch'
			}
		}
	}
}));

const Search = (props) => {
	const classes = useStyles();
	const [inputSearch, setInputSearch] = useState('');

	const onEnterPress = (event) => {
		//apelare functie din redux care filtreaza internshipurile
		if (event.code === 'Enter') console.log(inputSearch);
	};

	return (
		<div className={classes.search}>
			<InputBase
				placeholder="Search…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput
				}}
				inputProps={{ 'aria-label': 'search' }}
				onChange={(event) => {
					setInputSearch(event.target.value);
				}}
				onKeyPress={onEnterPress}
			/>
		</div>
	);
};

export default Search;
