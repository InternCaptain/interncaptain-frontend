import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AppState from '../redux/AppState';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { UserRole } from '../api/types/UserRole';
import { green } from '../themes/colors';
import { Internship } from '../api/types/Internship';
import Application from '../api/types/Application';

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

export interface InternshipWidgetProperties {
	internship: Internship;
	applications: Application[];
	role: UserRole;
	onExtend: () => void;
}

const InternshipWidget: React.FC<InternshipWidgetProperties> = (props) => {
	const classes = useStyles();

	const { internship, role, applications, onExtend } = props;

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
		role === UserRole.HR && extended ? setWidth('600px') : setWidth('300px');
	}, [extended]);

	const togglePressedButton = () => {
		setExtended(!extended);
	};

	const viewStudentsApplied = () => {
		togglePressedButton();
		onExtend();
	};

	const getDetailsByUserRole =
		role === UserRole.STUDENT ? (
			<Typography variant="body2" component="p">
				{description}
			</Typography>
		) : (
			<List dense className={classes.list}>
				{applications &&
					applications.map(({ student }) => {
						const { firstName, lastName, profilePicture } = student;
						const name = firstName + ' ' + lastName;
						return (
							<ListItem key={name} button>
								<ListItemAvatar>
									<Avatar src={profilePicture} />
								</ListItemAvatar>
								<ListItemText primary={name} />
							</ListItem>
						);
					})}
			</List>
		);

	const getContentByRole =
		role === UserRole.HR ? (
			<Box className={classes.cardContent}>
				<Box style={{ maxWidth: '250px' }}>
					<Typography variant="h6" component="h6">
						{positionName}
					</Typography>
					<Typography variant="body2" component="p" style={{ paddingTop: '30px' }}>
						{description}
					</Typography>
				</Box>
				<Box>{extended && getDetailsByUserRole}</Box>
			</Box>
		) : (
			<React.Fragment>
				<Typography variant="h6" component="h6">
					{positionName}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{`${firstName} ${lastName}`}
				</Typography>
				{extended && getDetailsByUserRole}
			</React.Fragment>
		);

	const getFooterByUserRole =
		role === UserRole.STUDENT ? (
			!extended ? (
				<Box>
					<Button size="small" onClick={togglePressedButton} className={classes.button}>
						Learn More
					</Button>
				</Box>
			) : (
				<React.Fragment>
					<Box>
						<Button size="small" onClick={togglePressedButton} className={classes.button}>
							Forget about it
						</Button>
					</Box>
					<Box>
						<Button
							size="small"
							onClick={() => {
								console.log('Am aplicat');
							}}
							className={classes.button}
						>
							Apply
						</Button>
					</Box>
				</React.Fragment>
			)
		) : !extended ? (
			<Button size="small" onClick={viewStudentsApplied} className={classes.button}>
				View students who applied
			</Button>
		) : (
			<React.Fragment>
				<Box>
					<Button size="small" onClick={togglePressedButton} className={classes.button}>
						Hide students who applied
					</Button>
				</Box>
				<Box>
					<Button
						size="small"
						onClick={() => {
							console.log('L-am sters');
						}}
						className={classes.button}
					>
						Delete this
					</Button>
				</Box>
			</React.Fragment>
		);

	return (
		<Card className={classes.root} style={{ width }}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{companyName}
					{bull}
					{domain}
				</Typography>
				{getContentByRole}
			</CardContent>
			<CardActions style={{ paddingTop: 0 }}>{getFooterByUserRole}</CardActions>
		</Card>
	);
};

const mapStateToProps = (state: AppState) => ({
	//studentsApplied: [],
	//companies: state.internshipState.companies,
});

const mapDispatchToProps = (dispatch: any) => ({
	//onRequestStudentsApplied: (internshipId) => dispatch(fetchApplications(internshipId))
});

export default connect(mapStateToProps, mapDispatchToProps)(InternshipWidget);
