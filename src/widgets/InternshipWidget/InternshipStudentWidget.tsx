import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { green } from '../../themes/colors';
import { Internship } from '../../api/types/Internship';

const useStyles = makeStyles({
	root: {
		margin: '10px',
		height: '250px'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12,
		fontSize: 12
	},
	list: {
		maxHeight: 100,
		overflow: 'auto',
		paddingRight: 0
	},
	cardContent: {
		display: 'flex'
	},
	button: {
		color: green.main
	}
});

export interface InternshipStudentWidgetProperties {
	internship: Internship;
	onExtend: () => void;
}

const InternshipStudentWidget: React.FC<InternshipStudentWidgetProperties> = (props) => {
	const classes = useStyles();

	const { internship, onExtend } = props;

	const [extended, setExtended] = useState(false);
	const [width, setWidth] = useState('300px');

	const {
		company: { name: companyName },
		description,
		domain,
		positionName,
		recruiter: { firstName, lastName }
	} = internship;

	const bull = <span className={classes.bullet}>•</span>;

	useEffect(() => {
		extended ? setWidth('600px') : setWidth('300px');
	}, [extended]);

	const toggleExtendButton = () => {
		setExtended(!extended);
		extended && onExtend();
	};

	const Details = () => (
		<Typography variant="body2" component="p">
			{description}
		</Typography>
	);

	const Actions = () =>
		extended ? (
			<React.Fragment>
				<Box>
					<Button size="small" onClick={toggleExtendButton} className={classes.button}>
						Forget about it
					</Button>
				</Box>
				<Box>
					<Button
						size="small"
						className={classes.button}
						onClick={() => {
							console.log('Am aplicat');
						}}>
						Apply
					</Button>
				</Box>
			</React.Fragment>
		) : (
			<Box>
				<Button size="small" onClick={toggleExtendButton} className={classes.button}>
					Learn More
				</Button>
			</Box>
		);

	const ExtendedActions = () => (
		<>
			<Button size="small" onClick={toggleExtendButton} className={classes.button}>
				Forget about it
			</Button>
			<Button
				size="small"
				className={classes.button}
				onClick={() => {
					console.log('Am aplicat');
				}}>
				Apply
			</Button>
		</>
	);

	return (
		<Card className={classes.root} style={{ width }}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{companyName}{bull}{domain}
				</Typography>
				<Typography variant="h6" component="h6">
					{positionName}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{`${firstName} ${lastName}`}
				</Typography>
				{extended && <Details />}
			</CardContent>
			<CardActions style={{ paddingTop: 0 }}>
				{
					extended ? <ExtendedActions /> : <Actions />
				}
			</CardActions>
		</Card>
	);
};

export default InternshipStudentWidget;
