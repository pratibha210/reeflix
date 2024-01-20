// ProfileSectionv2
// import React from 'react';
import '../sections.css';
import userimg from '../../../Images/userimg.png'
import EditIcon from '@material-ui/icons/Edit';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent'
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import React, { useEffect, Component, useState, usePrevious } from 'react';
import { __DEV } from "../../../isDev";
import * as moment from 'moment';

const ProfileSectionv2 = (props) => {
    const [localdata, setlocalData] = useState({})
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userDetails")))
    ////// for split name into first name and last name ////
    let firstName = userId ? userId.name.split(" ")[0] : null;
    let lastName = userId ? userId.name.split(" ")[1] : null;

    const [startDate, setStartDate] = React.useState(userId.dob);

    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChnage = date => {
        setStartDate(date)
    }
    // const editProfile = (props) => {
    //     props.history.push('/home/editprofile')
    // };

    return (
        <div className="profil-section">
            <div className="inner-profilecls">
                <div className="profile-headertitle">
                    <p className="profileheading">Profile</p>
                    <div className="profileimg-area">
                        <div className="userprofile">
                            <img src={userId && userId.imageId ? process.env.REACT_APP_apiurl + "/image/download?id=" + userId.imageId : userimg} alt="userimg" className="profileimg" />

                        </div>

                        <div className="profiledetlright">
                            <p className="profile-username">{userId ? userId.name : null}</p>
                            <NavLink to="/home/editprofile" className="linktext">
                                <ButtonComponent buttontext="Edit Profile" btniconclass={EditIcon}
                                    buttonextraclass="editprofile-butn"
                                />

                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="profiledeatils">
                    <p className="profile-titletext profiletitle-extracls">Personal Information</p>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">First Name :</li>
                            <li className="detilvalue">{firstName ? firstName : ""}</li>
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Last Name :</li>
                            <li className="detilvalue">{lastName ? lastName : ""}</li>
                        </ul>
                    </div>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">DOB :</li>
                            <li className="detilvalue">{userId ? moment(parseInt(userId.dob)).format("DD- MMM- YYYY") : ""}</li>
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Gender :</li>
                            <li className="detilvalue">{userId ? userId.gender : ""}</li>
                        </ul>
                    </div>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Email Address :</li>
                            <li className="detilvalue">{userId ? userId.email : ""}</li>
                        </ul>

                        <ul className="firstfield-detail">
                            <li className="detiltitle">Phone Number :</li>
                            <li className="detilvalue">{userId ? userId.phoneNumber : ""}</li>
                        </ul>
                    </div>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Address :</li>
                            <li className="detilvalue">{userId ? userId.address : ""}</li>
                        </ul>
                    </div>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Zipcode :</li>
                            <li className="detilvalue">{userId ? userId.zipcode : ""}</li>
                        </ul>
                    </div>
                    {/* <p className="profile-titletext profiletitle-extracls">Account Information</p>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Account No :</li>
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">IFSC Code :</li>
                            <li className="detilvalue">012304567890</li> 
                        </ul>
                    </div>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Bank Name :</li>
                            <li className="detilvalue">DGP Bank</li>
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Branch Code :</li>
                            <li className="detilvalue">0005</li>
                        </ul>
                    </div> */}

                    <p className="profile-titletext profiletitle-extracls">Login Credentials</p>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">User Id :</li>
                            <li className="detilvalue">{userId ? userId.email : null}</li>
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Password :</li>
                            <li className="detilvalue">
                            </li>
                        </ul>
                    </div>

                    <p className="profile-titletext profiletitle-extracls">Subscription Plan</p>
                    <div className="innerprofile-detailpart">
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Plan Name :</li>
                            {/* <li className="detilvalue">Platinum</li> */}
                        </ul>
                        <ul className="firstfield-detail">
                            <li className="detiltitle">Validity :</li>
                            {/* <li className="detilvalue">$ 10/year</li> */}
                        </ul>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default withRouter(ProfileSectionv2);