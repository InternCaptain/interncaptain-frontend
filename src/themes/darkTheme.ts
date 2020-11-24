import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const primary = colors.yellow;

const secondary = colors.red;

const darkTheme = createMuiTheme({
	shape: {
		borderRadius: 30
	},
	palette: {
		type: 'dark',
		primary,
		secondary,
		background: {
			default: '#101010',
			paper: '#202020'
		},
		text: {
			primary: '#f0f0f0',
			secondary: '#ffffff'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'::selection': {
					color: '#0f0f0f',
					backgroundColor: primary.light
				},
				'::-webkit-scrollbar': {
					width: '15px'
				},
				'::-webkit-scrollbar-thumb': {
					backgroundColor: primary.light,
					borderRadius: '15px'
				}
			}
		}
	}
});

export default darkTheme;
