// EditProfileSection
import '../sections.css';
import user from '../../../Images/user.png'
import TextFieldInput from '../../../Common/FormFields/TextFieldInput';
import Grid from '@material-ui/core/Grid';
import DatePickerInput from '../../../Common/FormFields/DatePickerInput';
import SelectFieldInput from '../../../Common/FormFields/SelectFieldInput';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { reeflix_App_key } from "../../../constant";
import { withRouter } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { __DEV } from "../../../isDev";
import * as moment from 'moment';
import { useSelector, useDispatch } from "react-redux"

const EditProfileSection = (props) => {

    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userDetails")))
    const [getGender, setGender] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [timeStamp, setTimeStamp] = useState();
    const [file, setFile] = useState(null);
    const [addAcnt, setAddAcnt] = useState(false);
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [loading, setloading] = useState({ load: false });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });

    const dispatch = useDispatch()

    
    ////// for split name into first name and last name ////
    // let firstName = userId.name.split(" ")[0];
    // let lastname = userId.name.split(" ")[1];

    ///// onChange function for date of birth////

    // useEffect(()=>{
    //     __DEV && console.log(userId)
    //     if(userId){

    //         //set left array when only group list
    //         setStartDate(userId.dob)
    //         console.log(userId.dob);

    //     }
    // },[startDate])

    ///// onChange function for date of birth////
    const onSetDate = date => {
        __DEV && console.log(date);
        setStartDate(date)
        // console.log(moment.utc(startDate).format("DD MMM YYYY"));
        var startTimeStamp = convertDateToTimestamp(date);
        setTimeStamp(startTimeStamp)
        __DEV && console.log(timeStamp);
    }

    const convertDateToTimestamp = (timeStamp) => {

        __DEV && console.log(timeStamp);
        var dobts = moment.utc(timeStamp).millisecond(0)
            .format("x");
        return dobts;
        // console.log(dobts);


    }
    const cancelClick = () => {
        props.history.push('/home/profile')
    };

    const showAccount = () => {
        setAddAcnt(!addAcnt)
        // this.setState({ activeWatch: !this.state.activeWatch });
    }
    const closeAccount = () => {
        setAddAcnt(false)
    }

    // const addImage = e => {

    ///// onChange function ////
    const handleChange = (name, val) => {
        __DEV && console.log(name, val);
        setUserId(prev => {
            return {
                ...prev,
                [name]: val
            }

        });

        __DEV && console.log(userId)

    }



    ////// add image oncahnge function ////
    const editImage = (e) => {

        __DEV && console.log(e.target.files[0]);
        let file = e.target.files[0]
        __DEV && console.log(file);
        ///// temp file seve /////
        setFile(file);
        __DEV && console.log(file);
    }


    /////////////// API call function ///////
    const updateUser = (imageid) => {
        __DEV && console.log(imageid);

        __DEV && console.log(userId);
        __DEV && console.log(userId._id);

        ///// field validation for  name///
        if (!userId.name) {
            setError({

                message: " Please enter firstName",
                textField: "name",
                showerror: true

            })

        }

        ///// field validation for  email///
        else if (!userId.email) {
            setError({

                message: " Please enter email",
                showerror: true,
                textField: "email"

            })

        }
        ///// field validation for  email format///
        else if (!userId.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError({
                textField: "email",
                showerror: true,
                message: 'Invalid email id.'
            })
        }
        ///// field validation for  phoneNumber///
        else if (!userId.phoneNumber) {
            setError({

                message: " Please enter Phone number",
                showerror: true,
                textField: "phoneNumber"
            })

        } ///// field validation for  address///
        else if (!userId.address) {
            setError({

                message: " Please enter address",
                showerror: true,
                textField: "address"
            })

        } ///// field validation for  phoneNumber///
        else if (!userId.zipcode) {
            setError({

                message: " Please enter zipcode",
                showerror: true,
                textField: "zipcode"
            })

        }

        else {

            ///////// API call from here for update user //////////
            setloading({
                load: true
            })
            const reqValues = {
                method: "PUT",
                body: JSON.stringify({
                    name: userId.name,
                    address: userId.address,
                    password: userId.newPassword,
                    email: userId.email,
                    gender: userId.gender,
                    phoneNumber: userId.phoneNumber,
                    zipcode: userId.zipcode,
                    dob: timeStamp == null ? userId.dob : timeStamp,
                    // accountNo: userId.accountNo,
                    // IFSCCode: userId.IFSCCode,
                    // branchCode: userId.branchCode,
                    // bankName: userId.bankName,
                    imageId: imageid
                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };
            __DEV && console.log(reqValues);
            fetch(process.env.REACT_APP_apiurl + "/user/update?id=" + userId._id, reqValues)
                .then(result => result.json())
                .then(result => {
                    __DEV && console.log(result);
                    setloading({
                        load: false
                    })
                    if (!result.error) {
                        __DEV && console.log(result.result);
                        // localStorage.setItem("userId", result.result._id);
                        localStorage.setItem('userDetails', JSON.stringify(result.result)); //will not use when reducer part for user wilbe completed
                        dispatch({ type: 'LOGGED_USER_DETAILS', data: result.result });

                        ////// push to home /////
                        __DEV && console.log(props.history)
                        props.history.push('/home/profile');

                    } else {

                        ///// useState for show result's err message///

                        setErr({

                            texterr: result.message,
                            showtexterr: true,

                        })
                    }
                })
                .catch(err => {
                    /////loading false////
                    setloading({
                        load: false,

                    })
                    ///// useState for show  err message///
                    setErr({

                        texterr: err.message,
                        showtexterr: true,

                    })

                })

        }
    };


    ///// upload image function ////
    const uploadImage = () => {

        if (!file) {
            /// loading false ///
            // setloading({ load: true })
            ///// upadte user function call ///
            updateUser();
        }
        else {
            const formData = new FormData();
            formData.append('file', file);

            const config = {
                method: "POST",
                body: formData
            };

            fetch(process.env.REACT_APP_apiurl + "/image/upload", config)
                .then(result => result.json())
                .then(result => {
                    __DEV && console.log(result);
                    //  setloading({ load: true })
                    if (!result.error) {
                        __DEV && console.log(result);
                        let imageid = result.upload._id
                        __DEV && console.log(imageid);
                        /// loading false ///

                        ///// upadte user function call ///
                        updateUser(imageid);


                    } else {

                        ///// useState for show result's err message///
                        let data = {
                            message: "no data found!!"
                        }
                        setErr({

                            texterr: data.message,
                            showtexterr: true,

                        })
                    }
                })
                .catch(err => {
                    __DEV && console.log(err);
                })

        }
    }

    return (
        <div className="profil-section edit-profilesec">
            <div className="inner-profilecls">
                <div className="profile-headertitle">
                    <div className="page-path">
                        <NavLink to="/home/profile">
                            <p className="pathname"> Profile </p>
                        </NavLink>
                        <ArrowForwardIosIcon />
                        <p className="profileheading">Edit Profile</p>
                    </div>
                    <p className="profile-titletext borderbotm">Basic Information</p>
                    <div className="profileimg-area">
                        <div className="userprofile">
                            {file ?
                                <img src={file ? URL.createObjectURL(file) : user} alt="userimg" className="profileimg" />
                                :

                                <img src={userId.imageId ? process.env.REACT_APP_apiurl + "/image/download?id=" + userId.imageId : user} alt="userimg" className="profileimg" />
                            }
                            <div className="uploadbtn">
                                <div className="editprofileimg-butn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    <input type="file" onChange={editImage} name="imageId" className="upload-pfimage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profiledeatils">
                    <form className="profiledetails-form">
                        <div className="inner-profiledetl-form">
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="First Name" textinputType="text"
                                            onChange={handleChange} defaultValue={userId ? userId.name : null}
                                            error={
                                                error.textField && error.textField === "name"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "name"
                                                    ? error.message
                                                    : null
                                            }
                                            textinputname="name" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                {/* <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Last Name" textinputType="text"
                                            onChange={handleChange} defaultValue={userId ? lastname : null}
                                            error={
                                                error.textField && error.textField === "lastname"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "lastname"
                                                    ? error.message
                                                    : null
                                            }
                                            textinputname="lastname" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid> */}
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <DatePickerInput inputLabel="Date of Birth" textinputname="dob"
                                            defaultValue={timeStamp == null ? moment(parseInt(userId.dob)).format("DD-MMM-YYYY") : moment((startDate)).format("DD-MMM-YYYY")} handleChnage={onSetDate} />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <SelectFieldInput inputLabel="Gender"
                                            selectoptions={[
                                                { label: 'Male', value: 'male' },
                                                { label: 'Female', value: 'female' },
                                                { label: 'Others', value: 'other' },
                                            ]} value={userId.gender}
                                            handleChange={handleChange} textinputname="gender"
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Email Address" textinputType="text"
                                            error={
                                                error.textField && error.textField === "email"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "email"
                                                    ? error.message
                                                    : null
                                            }
                                            onChange={handleChange} defaultValue={userId ? userId.email : null} textinputname="email" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Phone Number" textinputType="number"
                                            error={
                                                error.textField && error.textField === "phoneNumber"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "phoneNumber"
                                                    ? error.message
                                                    : null
                                            }
                                            onChange={handleChange} defaultValue={userId ? userId.phoneNumber : null} textinputname="phoneNumber" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Address" textinputType="text"
                                            error={
                                                error.textField && error.textField === "address"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "address"
                                                    ? error.message
                                                    : null
                                            }
                                            onChange={handleChange} defaultValue={userId ? userId.address : null} textinputname="address" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Zipcode" textinputType="text"
                                            error={
                                                error.textField && error.textField === "zipcode"
                                                    ? true
                                                    : false
                                            }
                                            errorText={
                                                error.textField && error.textField === "zipcode"
                                                    ? error.message
                                                    : null
                                            }
                                            onChange={handleChange} defaultValue={userId ? userId.zipcode : null} textinputname="zipcode" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        {/* <div className="accountinfoheader">
                            <p className="profile-titletext profiletitle-extracls">Account Information</p>
                            <Tooltip title="Add Account" placement="bottom" >
                                <AddBoxIcon className="addacounticon" onClick={showAccount} />
                            </Tooltip>
                        </div>
                        <div className="inner-profiledetl-form">
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Account No" textinputType="text"
                                            onChange={handleChange} textinputname="accountNo" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="IFSC Code" textinputType="number"
                                            onChange={handleChange}
                                            textinputname="IFSCCode" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <SelectFieldInput inputLabel="Bank Name"
                                            selectoptions={[
                                                { label: 'Select', value: 'select' },
                                                { label: 'SBI', value: 'sbi' },
                                                { label: 'HDFC', value: 'hdfc' },
                                                { label: 'UBI', value: 'ubi' },
                                                { label: 'Axis', value: 'axis' },
                                                { label: 'UCO', value: 'uco' },
                                                { label: 'OBC', value: 'obc' },
                                                { label: 'Corporation Bank', value: 'cb' },
                                                { label: 'Punjab Bank', value: 'pb' },
                                            ]}
                                            handleChange={handleChange} textinputname="bankName"
                                        />

                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Branch Code" textinputType="number"
                                            onChange={handleChange} textinputname="branchCode" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div> */}
                        {/* Add Account part start */}
                        {/* {addAcnt === true ?
                            <form>
                                <p className="profile-titletext profiletitle-extracls">Add Account</p>

                                <div className="inner-profiledetl-form">
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <div className="profile-singlefield">
                                                <TextFieldInput inputLabel="Account No" textinputType="text"
                                                    textinputname="accountno" extralabelcls="profileinputlabel" />
                                            </div>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <div className="profile-singlefield">
                                                <TextFieldInput inputLabel="IFSC Code" textinputType="number"
                                                    textinputname="IFSCcode" extralabelcls="profileinputlabel" />
                                            </div>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <div className="profile-singlefield">
                                                <SelectFieldInput inputLabel="Bank Name"
                                                    selectoptions={[
                                                        { label: 'Select', value: 'select' },
                                                        { label: 'SBI', value: 'sbi' },
                                                        { label: 'HDFC', value: 'hdfc' },
                                                        { label: 'UBI', value: 'ubi' },
                                                        { label: 'Axis', value: 'axis' },
                                                        { label: 'UCO', value: 'uco' },
                                                        { label: 'OBC', value: 'obc' },
                                                        { label: 'Corporation Bank', value: 'cb' },
                                                        { label: 'Punjab Bank', value: 'pb' },
                                                    ]} handleChange={handleChange} textinputname="BankName" />

                                            </div>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <div className="profile-singlefield">
                                                <TextFieldInput inputLabel="Branch Code" textinputType="number"
                                                    textinputname="branchcode" extralabelcls="profileinputlabel" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div className="addacnt-butnarea">
                                        <ButtonComponent buttontext="Delete"
                                            handleClick={closeAccount}
                                            buttonextraclass="cancelacntbutn" />
                                        <ButtonComponent buttontext="Save" buttonextraclass="acntsavebutn" />
                                    </div>
                                </div>
                            </form>
                            : null
                        } */}
                        {/* Add Account part end */}

                        <p className="profile-titletext profiletitle-extracls">Login Credentials</p>
                        <div className="inner-profiledetl-form">
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="User Id" textinputType="text"
                                            defaultValue={userId ? userId.email : null}
                                            textinputname="user id" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div className="profile-singlefield">
                                        <TextFieldInput inputLabel="Password" textinputType="password"
                                            defaultValue={userId ? userId.password : null} textinputname="password" extralabelcls="profileinputlabel" />
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="profile-singlefield buttonarea">
                                <ButtonComponent loading={loading.load}
                                    handleClick={cancelClick} buttonmainclass="cancelbtn"
                                    buttontext="Cancel" buttonextraclass="profilecnclbutn" />

                                <ButtonComponent loading={loading.load} handleClick={uploadImage} buttontext="Save" buttonextraclass="profilesavebutn" />

                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(EditProfileSection);