import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const primary = colors.green;
const secondary = colors.ice;

const lightTheme = createMuiTheme({
	shape: {
		borderRadius: 10
	},
	palette: {
		type: 'light',
		primary,
		secondary,
		background: {
			default: '#fafafa',
			paper: '#ffffff'
		},
		text: {
			primary: '#0f0f0f',
			secondary: '#202020'
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
					width: '5px'
				},
				'::-webkit-scrollbar-thumb': {
					backgroundColor: primary.light,
					borderRadius: '5px'
				}
			}
		}
	}
});

export default lightTheme;
