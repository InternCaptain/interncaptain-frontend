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
import { Box, Icon } from '@material-ui/core';
import { green } from '../../themes/colors';
import { Internship } from '../../api/types/Internship';
import Application from '../../api/types/Application';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { ApplicationStatus } from '../../api/types/ApplicationStatus';

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

export interface InternshipRecruiterWidgetProperties {
	internship: Internship;
	applications: Application[];
	onExtend: () => void;
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => void;
}

const InternshipRecruiterWidget: React.FC<InternshipRecruiterWidgetProperties> = (props) => {
		const classes = useStyles();

		const { internship, applications, onExtend, onSetApplicationStatus } = props;

		const [extended, setExtended] = useState(false);
		const [width, setWidth] = useState('300px');

		const {
			company: { name: companyName },
			description,
			domain,
			positionName,
		} = internship;

		const bull = <span className={classes.bullet}>•</span>;

		useEffect(() => {
			extended ? setWidth('600px') : setWidth('300px');
		}, [extended]);

		const togglePressedButton = () => {
			setExtended(!extended);
		};

		const viewStudentsApplied = () => {
			togglePressedButton();
			onExtend();
		};

		const toggleApplicationStatus = (id: number) => (event, newStatus) => {
			onSetApplicationStatus(id, newStatus);
		}

		const Details = () => (
			<List dense className={classes.list}>
				{applications &&
				applications.map(({ student, status, id }) => {
					const { firstName, lastName, profilePicture } = student;
					const name = `${firstName} ${lastName}`;
					
					return (
						<ListItem key={name} button>
							<ListItemAvatar>
								<Avatar src={profilePicture} />
							</ListItemAvatar>

							<ListItemText 
								primary={name} 
								secondary={
									<ToggleButtonGroup exclusive value={status} onChange={toggleApplicationStatus(id)}>
										<ToggleButton value="PENDING">
											<Icon>pending</Icon>
										</ToggleButton>
										<ToggleButton value="UNDERCONSIDERATION">
											<Icon>preview</Icon>
										</ToggleButton>
										<ToggleButton value="ACCEPTED">
											<Icon>done</Icon>
										</ToggleButton>
										<ToggleButton value="REJECTED">
											<Icon>close</Icon>
										</ToggleButton>
									</ToggleButtonGroup>
								}
							/>
							
						</ListItem>
					);
				})}
			</List>
		);

		const Content = () =>
			(
				<Box className={classes.cardContent}>
					<Box style={{ maxWidth: '250px' }}>
						<Typography variant="h6" component="h6">
							{positionName}
						</Typography>
						<Typography variant="body2" component="p" style={{ paddingTop: '30px' }}>
							{description}
						</Typography>
					</Box>
					<Box>{extended && Details}</Box>
				</Box>
			);

		const Actions = () => (
			<Button size="small" onClick={viewStudentsApplied} className={classes.button}>
				View students who applied
			</Button>
		);

		const ExtendedActions = () => (
			<Button size="small" onClick={togglePressedButton} className={classes.button}>
				Hide students who applied
			</Button>
		);

		return (
			<Card className={classes.root} style={{ width }}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{companyName}
						{bull}
						{domain}
					</Typography>
					<Content />
				</CardContent>
				<CardActions style={{ paddingTop: 0 }}>
					{
						extended ? <ExtendedActions /> : <Actions />
					}
				</CardActions>
			</Card>
		);
	}
;

export default InternshipRecruiterWidget;
