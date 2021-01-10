import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {green} from '../../themes/colors';
import {Internship} from '../../api/types/Internship';
import {Avatar, CardHeader} from '@material-ui/core';
import {capitalizeFirstLetter} from '../../utils/utils';
import Application from '../../api/types/Application';

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
    application?: Application;
    onExtend: () => void;
    onAddApplication: (internshipId: number) => void;
}

const InternshipStudentWidget: React.FC<InternshipStudentWidgetProperties> = (props) => {
    const classes = useStyles();

    const {internship, onExtend, onAddApplication, application} = props;

    const [extended, setExtended] = useState(false);

    const {
        id,
        company: {name: companyName},
        description,
        domain,
        positionName,
        recruiter: {firstName, lastName, profilePicture}
    } = internship;

    const toggleExtendButton = () => {
        setExtended(!extended);
        !extended && application === undefined && onExtend();
    };

    const Details = () => (
        <Typography variant={'body2'}>
            Recruiter:
            <Avatar src={profilePicture}/>
            {`${firstName} ${lastName}`}
        </Typography>

    );

    const Actions = () => (
        <Button onClick={toggleExtendButton} className={classes.button}>
            More
        </Button>
    );

    const ExtendedActions = () =>
        application !== undefined ?
            <Typography>{application.status}</Typography> :
            <Button
                className={classes.button}
                onClick={() => {
                    onAddApplication(id);
                }}>
                Apply
            </Button>
    ;

    const domainName = domain
        .split('_')
        .map((a) => a.toLowerCase())
        .map(capitalizeFirstLetter)
        .join(' ');

    return (
        <Card className={classes.root} style={{display: 'flex'}}>
            <div style={{width: '300px', display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                    title={positionName.substr(0, 18) + (positionName.length > 20 ? '...' : '')}
                    subheader={`${companyName} in ${domainName}`}
                />
                <CardContent style={{flexGrow: 1}}>{description.substr(0, 120) + '...'}</CardContent>
                <div style={{flexGrow: 1}}/>
                <CardActions>
                    {extended ? (
                        <Button onClick={toggleExtendButton} className={classes.button}>
                            {' '}
                            Less{' '}
                        </Button>
                    ) : (
                        <Actions/>
                    )}
                </CardActions>
            </div>
            {extended && (
                <div style={{maxWidth: '200px'}}>
                    <CardContent style={{flexGrow: 1}}>
                        <Details/>
                    </CardContent>
                    <div style={{flexGrow: 1}}/>
                    <CardActions>
                        <ExtendedActions/>
                    </CardActions>
                </div>
            )}
        </Card>
    );
};

export default InternshipStudentWidget;
