import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '../../themes/colors';
import { Internship } from '../../api/types/Internship';
import { CardHeader } from '@material-ui/core';
import { capitalizeFirstLetter } from '../../utils/utils';

const useStyles = makeStyles({
	root: {
		margin: '10px',
		height: '250px'
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

	const {
		company: { name: companyName },
		description,
		domain,
		positionName,
		recruiter: { firstName, lastName }
	} = internship;

	const toggleExtendButton = () => {
		setExtended(!extended);
		extended && onExtend();
	};

	const Details = () => (
		<>
			<Typography variant={'body2'}>
				Recruiter: {`${firstName} ${lastName}`}
			</Typography>
			<Typography>
			</Typography>
		</>
	);

	const Actions = () => (
		<Button onClick={toggleExtendButton} className={classes.button}>
			Learn More
		</Button>
	);

	const ExtendedActions = () => (
		<Button
			className={classes.button}
			onClick={() => {
				console.log('Am aplicat');
			}}>
			Apply
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
					{description}
				</CardContent>
				<div style={{ flexGrow: 1 }} />
				<CardActions>
					<Actions />
				</CardActions>
			</div>
			{
				extended && <div style={{ maxWidth: '200px' }}>
					<CardContent style={{ flexGrow: 1 }}>
						<Details />
					</CardContent>
					<CardActions>
						<ExtendedActions />
					</CardActions>
				</div>
			}
		</Card>
	);
};

export default InternshipStudentWidget;
