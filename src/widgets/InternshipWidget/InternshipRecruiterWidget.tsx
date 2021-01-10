import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { CardHeader, Icon } from '@material-ui/core';
import { green } from '../../themes/colors';
import { Internship } from '../../api/types/Internship';
import Application from '../../api/types/Application';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { ApplicationStatus } from '../../api/types/ApplicationStatus';
import { capitalizeFirstLetter } from '../../utils/utils';

const useStyles = makeStyles({
	root: {
		margin: '10px',
		height: '250px'
	},
	list: {
		maxHeight: 150,
		overflow: 'auto',
		paddingRight: 0
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

		const Actions = () => (
			<Button onClick={viewStudentsApplied} className={classes.button}>
				More
			</Button>
		);

		const ExtendedActions = () => (
			<Button onClick={togglePressedButton} className={classes.button}>
				Less
			</Button>
		);

		const domainName = domain.split('_').map(a => a.toLowerCase()).map(capitalizeFirstLetter).join(' ');

		return (
			<Card className={classes.root} style={{ display: 'flex' }}>
				<div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
					<CardHeader
						title={positionName}
						subheader={`${companyName} in ${domainName}`}
					/>
					<CardContent style={{ flexGrow: 1 }}>
						{description.slice(0, 500)}
					</CardContent>
					<div style={{ flexGrow: 1 }} />
					<CardActions>
						{
							extended ? <ExtendedActions /> : <Actions />
						}
					</CardActions>
				</div>
				{
					extended && <div>
						<CardContent style={{ flexGrow: 1 }}>
							<Details />
						</CardContent>
					</div>
				}
			</Card>
		);
	}
;

export default InternshipRecruiterWidget;
