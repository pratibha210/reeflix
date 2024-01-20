// import React from 'react';
import '../sections.css';
import userimg from '../../../Images/userimg.png'
import img04 from '../../../Images/img04.jpg'
import TextFieldInput from '../../../Common/FormFields/TextFieldInput';
import Grid from '@material-ui/core/Grid';
import DatePickerInput from '../../../Common/FormFields/DatePickerInput';
import SelectFieldInput from '../../../Common/FormFields/SelectFieldInput';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import {  useSelector, useDispatch } from "react-redux"
import React, {useEffect, Component,useState ,usePrevious} from 'react';

const ProfileSection = () => {

    const [userId,setUserId] = useState({userData: null})
    

    const [startDate, setStartDate] = React.useState(new Date());

    const handleChnage = date => {
        setStartDate(date)
    }

    

    return (
        <div className="profil-section">
            <div className="inner-profilecls">
                <div className="profile-headertitle">
                    <p className="profile-titletext borderbotm">Personal Information</p>
                    <div className="profileimg-area">
                        <div className="userprofile">
                            <img src={userimg} alt="userimg" className="profileimg" />

                        </div>

                        <div>
                            <p className="profile-username">Rajeshree Kundu</p>
                            <p className="editimg">Change Avatar</p>
                        </div>
                    </div>
                </div>
                <div className="profiledeatils">
                    <p className="profile-titletext profiletitle-extracls">Account Information</p>
                    <form className="profiledetails-form">
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <TextFieldInput inputLabel="First Name" textinputType="text"
                                        textinputname="first name" extralabelcls="profileinputlabel" />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <TextFieldInput inputLabel="Last Name" textinputType="text"
                                        textinputname="last name" extralabelcls="profileinputlabel" />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <DatePickerInput inputLabel="Date of Birth"
                                        value={startDate} onChange={handleChnage} />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <SelectFieldInput inputLabel="Gender"
                                        selectoptions={[
                                            { label: 'Male', value: 'male' },
                                            { label: 'Female', value: 'female' },
                                            { label: 'Others', value: 'other' },
                                        ]} />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <TextFieldInput inputLabel="Email Address" textinputType="text"
                                        textinputname="email" extralabelcls="profileinputlabel" />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <TextFieldInput inputLabel="Phone Number" textinputType="number"
                                        textinputname="number" extralabelcls="profileinputlabel" />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <TextFieldInput inputLabel="Password" textinputType="password"
                                        textinputname="password" extralabelcls="profileinputlabel" />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="profile-singlefield">
                                    <ButtonComponent buttontext="Save" buttonextraclass="profilebutn" />
                                </div>
                            </Grid>
                        </Grid>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;