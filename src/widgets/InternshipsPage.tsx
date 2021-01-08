import React, {useEffect} from 'react';
import InternshipWidget from "./InternshipWidget";
import {UserRole} from "../api/types/UserRole";
import AppState from "../redux/AppState";
import {fetchInternships} from "../redux/internship";
import {connect} from "react-redux";
import {Box} from "@material-ui/core";

const internship = {
    companyName:"MicroFocus",
    positionName:"Intern SoftWare Developer",
    recruiterName:"Dana Ionescu",
    description:"Cautam Cautam Cautam Cautam Cautam Cautam Cautam Cautam",
    internshipId: 1,
    domain: "Computer Science"
}

const studentsApplied = [
    {
        firstName: "Georgel",
        secondName: "Georgica",
        profile: "https://i.pinimg.com/originals/47/62/38/476238fc32a9d41ae39649c56ed59947.jpg"
    },
    {
        firstName: "Csibula",
        secondName: "El",
        profile: "https://www.nationalfm.ro/data_files/mce_images/Septembrie/Animale_zambarete/animale_care_zambesc_10.jpg"
    },
    {
        firstName: "Csibula",
        secondName: "Ea",
        profile: "https://i.ytimg.com/vi/yAz2WD21iI4/maxresdefault.jpg"
    },
]

const internships = [internship,internship, internship, internship, internship, internship,internship, internship,internship,internship, internship,internship,internship, internship,internship,internship, internship];

const InternshipPage = (props) => {
    const {/*role, internships,*/ companies, onRequestInternships, currentUser} = props;

    useEffect(() => {
        //onRequestInternships(role === UserRole.HR ? currentUser.id : null);
    }, [])

    const getInternshipsCardsByFive = () => {
        const finalCards = [];
        let indexFinalCards = 0;
        let countGroup = 0;
        let temp = [];
        for(let i = 0; i < internships.length; i = i+1) {
            if(countGroup < 4) {
                temp[countGroup] = internships[i];
                countGroup = countGroup + 1;
            }
            if(countGroup === 4) {
                countGroup = 0;
                finalCards[indexFinalCards] = temp;
                indexFinalCards = indexFinalCards + 1;
                temp = [];
            }
        }
        if(temp.length !== 0) {
            finalCards[indexFinalCards] = temp;
        }
        return finalCards.map(el => {
            return <Box style={{display: "flex", justifyContent: "center"}}>
                {el.map(internship => {return (<InternshipWidget internship={internship} role={UserRole.HR}/>)})}
            </Box>
        });

    };

    return (
        <Box>
            {getInternshipsCardsByFive()}
        </Box>
    );
};

const mapStateToProps = (state: AppState) => ({
    //role: state.userState.currentUser.role,
    //internships: state.internshipState.internships,
    currentUser: state.userState.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    onRequestInternships: (recruiterId) => dispatch(fetchInternships(recruiterId))
});
export default connect(mapStateToProps,mapDispatchToProps)(InternshipPage);