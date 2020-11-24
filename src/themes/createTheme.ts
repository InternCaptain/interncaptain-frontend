import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const dark = {
	background: {
		default: '#101010',
		paper: '#202020'
	},
	text: {
		primary: '#f0f0f0',
		secondary: '#ffffff'
	}
};

const light = {
	background: {
		default: '#fafafa',
		paper: '#ffffff'
	},
	text: {
		primary: '#0f0f0f',
		secondary: '#202020'
	}
};

export default function createTheme(primary: any, secondary: any = colors.blue, type: 'dark' | 'light' = 'light') {
	return createMuiTheme({
		shape: {
			borderRadius: 10
		},
		palette: {
			type,
			primary,
			secondary,
			...(type === 'dark' ? dark : light)
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
}
