// SignUpForm
import React, { useState, Component } from 'react';
import './forms.css';
import { withRouter, NavLink } from "react-router-dom";
import TextFieldInput from '../../Common/FormFields/TextFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import Card from '@material-ui/core/Card';
import logo from '../../Images/reeflix_logo.png'
import Grid from '@material-ui/core/Grid';
import SelectFieldInput from '../../Common/FormFields/SelectFieldInput';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import { __DEV } from "../../isDev";
import { reeflix_App_key } from "../../constant";
import DatePickerInput from '../../Common/FormFields/DatePickerInput';
import TextAreaFieldInput from '../../Common/FormFields/TextAreaFieldInput';
import * as moment from 'moment';
import ReactGA from 'react-ga';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OtpForm from './OtpForm';

const SignUpForm = (props) => {
    const [showstate, setShowstate] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [timeStamp, setTimeStamp] = useState();
    const [getGender, setGender] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [checked, setChecked] = useState(false);
    const [signUpData, setsignUpData] = useState({});
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [loading, setloading] = useState({ load: false });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });


    ///// onChange function for date of birth////
    const onSetDate = date => {
        __DEV && console.log(date);
        setStartDate(date)
        // __DEV && console.log(moment.utc(startDate).format("DD MMM YYYY"));
        var startTimeStamp = convertDateToTimestamp(date);
        setTimeStamp(startTimeStamp)
        __DEV && console.log(timeStamp);
    }

    const convertDateToTimestamp = (timeStamp) => {

        __DEV && console.log(timeStamp);
        var dobts = moment.utc(timeStamp).millisecond(0)
            .format("x");
        return dobts;
        // __DEV && console.log(dobts);


    }
    /////////////// API call function ///////
    const signUpClick = () => {

        __DEV && console.log(signUpData);

        ////// field validation /////////
        ///// field validation for  name///
        if (!signUpData.name) {
            setError({

                message: " Please enter name",
                textField: "name",
                showerror: true

            })

        }
        ///// field validation for  email///
        else if (!signUpData.email) {
            setError({

                message: " Please enter email",
                showerror: true,
                textField: "email"

            })

        }
        ///// field validation for  email format///
        else if (!signUpData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError({
                textField: "email",
                showerror: true,
                message: 'Invalid email id.'
            })
        }
        ///// field validation for  phoneNumber///
        else if (!signUpData.phoneNumber) {
            setError({

                message: " Please enter Phone number",
                showerror: true,
                textField: "phoneNumber"
            })

        }
        ///// field validation for  password///
        else if (!signUpData.password) {
            setError({

                message: " Please enter password",
                showerror: true,
                textField: "password"
            })

        }
        ///// field validation for confirm password///
        else if (!signUpData.confirmPassword) {
            setError({

                message: "Please enter confirmPassword!!",
                showerror: true,
                textField: "confirmPassword"

            })

        }
        // ///// field validation for gender///
        // else if (!getGender.gender) {
        //     setError({

        //         message: "Please select gender",
        //         showerror: true,
        //         textField: "gender"

        //     })

        // }
        else if (!timeStamp) {
            setError({

                message: "Please Enter Date of Birth",
                showerror: true,
                textField: "dob"

            })

        }
        else if (!signUpData.address) {
            setError({

                message: "Please Enter address",
                showerror: true,
                textField: "address"

            })

        }
        else if (!signUpData.zipcode) {
            setError({

                message: "Please Enter zipcode",
                showerror: true,
                textField: "zipcode"

            })

        }
        ///// password and confirm password matching validation///
        else if (signUpData.password !== signUpData.confirmPassword) {
            setError({

                message: "Password and ConfirmPassword do not matching!!",
                showerror: true,
                textField: "confirmPassword"
            })

        }
        else if (!checked) {
            setErr({

                texterr: "Kindly accept terms & conditions !!!",
                showtexterr: true

            })

        }
        else {
            ///////// API call from here for create user //////////
            setloading({
                load: true,

            })
            const reqValues = {
                method: "POST",
                body: JSON.stringify({

                    name: signUpData.name,
                    password: signUpData.password,
                    email: signUpData.email,
                    gender: getGender.gender ? getGender.gender : "male" ,
                    phoneNumber: signUpData.phoneNumber,
                    dob: timeStamp,
                    address: signUpData.address,
                    zipcode: signUpData.zipcode
                    //   imageId: values.imageId

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };
            __DEV && console.log(reqValues.body);
            fetch(process.env.REACT_APP_apiurl + "/user/create", reqValues)
                .then(result => result.json())
                .then(result => {
                    __DEV && console.log(result);
                    setloading({
                        load: false
                    })
                    if (!result.error) {
                        __DEV && console.log(result.result);
                        let phoneno = result.result.phoneNumber
                        setPhoneno(phoneno);
                        __DEV && console.log(phoneno);
                        // localStorage.setItem("userId", result.result._id);
                        // localStorage.setItem('userDetails', JSON.stringify(result.result));
                        // ReactGA.event({
                        //     category: 'User',
                        //     action: 'Registration-success',
                        //     label: signUpData.email,
                        //     value: signUpData.email
                        // })

                        setShowstate(true)

                        // ////// push to home /////
                        // props.history.replace("/home");

                    } else {
                        // ReactGA.event({
                        //     category: 'User',
                        //     action: 'Registration-failure',
                        //     label: signUpData.email + ':' + result.message,
                        //     value: signUpData.email + ':' + result.message
                        // })
                        ///// useState for show result's err message///
                        setErr({

                            texterr: result.message,
                            showtexterr: true,

                        })
                    }
                })
                .catch(err => {
                    setloading({
                        load: false,

                    })
                    ///// useState for show  err message///
                    setErr({

                        texterr: err.message,
                        showtexterr: true,

                    })
                    // ReactGA.event({
                    //     category: 'User',
                    //     action: 'Registration-failure',
                    //     label: signUpData.email + ':' + err.message,
                    //     value: signUpData.email + ':' + err.message
                    // })

                })

        }
    };
    /////// onChange function //////
    const handleChange = (name, val) => {
        __DEV && console.log(name, val)
        setsignUpData(prev => {
            return {
                ...prev,
                [name]: val
            }

        });

        __DEV && console.log(signUpData)

    }
    /// onchange function for gender/////
    const onChangeFunc = (name, val) => {
        __DEV && console.log(name, val);
        setGender({ [name]: val })


        __DEV && console.log(getGender);

    }

    const onChange = () => {

        setChecked(!checked);
    }



    return (
        <div className="formstartcls signupformstart">
            <div className='loginoverlay'></div>
            {showstate !== true ?
                <div className="inerformfield">
                    <div className="authlogoarea signuplogo"
                    // onClick={logoClick}
                    >
                        <NavLink to="/home">
                            <img src={logo} className="headerlogo" alt="logo" />
                        </NavLink>
                    </div>
                    <Card className="formcard-start signupform-card">

                        <div>
                            <form className="login-innerform signup-innerform">
                                <div className="formheader">
                                    <h3 className="formheading">Create New Account</h3>
                                    <p className="forgotpaswrdtxt">Already registered? <NavLink to="/auth" className="linktext">
                                        Login</NavLink>
                                    </p>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="name" textinputType="text"
                                                inputLabel="Name"
                                                error={error.textField && error.textField === "name" ? true : false}
                                                errorText={
                                                    error.textField && error.textField === "name"
                                                        ? error.message
                                                        : null
                                                } clickLogin={signUpClick}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="email" textinputType="text"
                                                inputLabel="Email address"
                                                error={
                                                    error.textField && error.textField === "email"
                                                        ? true
                                                        : false
                                                }
                                                errorText={
                                                    error.textField && error.textField === "email"
                                                        ? error.message
                                                        : null
                                                } clickLogin={signUpClick}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="phoneNumber" textinputType="number"
                                                inputLabel="Phone number"
                                                error={
                                                    error.textField && error.textField === "phoneNumber"
                                                        ? true
                                                        : false
                                                }
                                                errorText={
                                                    error.textField && error.textField === "phoneNumber"
                                                        ? error.message
                                                        : null
                                                } clickLogin={signUpClick}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <DatePickerInput inputLabel="Date of Birth" textinputname="dob" extralabelcls='doblabel'
                                                value={startDate} handleChnage={onSetDate} datepickerextracls='dobinputcls'
                                                error={error.textField && error.textField === "dob" ? true : false}
                                                errorText={
                                                    error.textField && error.textField === "dob"
                                                        ? error.message
                                                        : null
                                                } />
                                        </div>


                                    </Grid>
                                    <Grid item md={6} xs={12}>

                                        <div className="formfieldcls">
                                            <SelectFieldInput inputLabel="Gender" textinputname="gender"
                                                selectoptions={[
                                                    { label: 'Male', value: 'male' },
                                                    { label: 'Female', value: 'female' },
                                                    { label: 'Transgender', value: 'transgender' },
                                                ]} handleChange={onChangeFunc}

                                                error={error.textField && error.textField === "gender" ? true : false}
                                                errorText={
                                                    error.textField && error.textField === "gender"
                                                        ? error.message
                                                        : null
                                                }
                                            // checkSubmit= {signUpClick}
                                            />
                                        </div>
                                    </Grid>



                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="zipcode" textinputType="number"
                                                inputLabel="Pin Code" error={error.textField && error.textField === "zipcode" ? true : false}
                                                errorText={
                                                    error.textField && error.textField === "zipcode"
                                                        ? error.message
                                                        : null
                                                } />
                                        </div>
                                    </Grid>
                                    <Grid item md={12} xs={12}>


                                        <div className="formfieldcls">

                                            <TextAreaFieldInput onChange={handleChange}
                                                textinputname="address" textinputType="address"
                                                inputLabel="Address"
                                                error={error.textField && error.textField === "address" ? true : false}
                                                errorText={
                                                    error.textField && error.textField === "address"
                                                        ? error.message
                                                        : null
                                                } MaxRowsnumber={5} rowsnumber={3} />
                                        </div>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="password" textinputType="password"
                                                inputLabel="Password"
                                                error={
                                                    error.textField && error.textField === "password"
                                                        ? true
                                                        : false
                                                }
                                                errorText={
                                                    error.textField && error.textField === "password"
                                                        ? error.message
                                                        : null
                                                } clickLogin={signUpClick}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className="formfieldcls">
                                            <TextFieldInput textnewclass="loginform-field" onChange={handleChange}
                                                textinputname="confirmPassword" textinputType="password"
                                                inputLabel="Confirm password"
                                                error={
                                                    error.textField && error.textField === "confirmPassword"
                                                        ? true
                                                        : false
                                                }
                                                errorText={
                                                    error.textField && error.textField === "confirmPassword"
                                                        ? error.message
                                                        : null
                                                } clickLogin={signUpClick}
                                            />
                                        </div>

                                    </Grid>
                                </Grid>


                                <div className="loginbutn-area signupbutn-area">
                                   
                                    {err.showtexterr === true ? <div className="formerrormsg-area"> <p className="formerrortxt"> {err.texterr}</p></div>
                                        : null}

                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox color="#2b2b2b" checked={checked} onChange={onChange} />}
                                        label={<p className="checkboxtext">I have agree to the <a target='blank' href='#'>Terms & Conditions.</a></p>}
                                        labelPlacement="end"
                                    />
                                    <ButtonComponent buttontext="SIGN UP" buttonextraclass="loginbuttn"
                                        handleClick={signUpClick} loading={loading.load}
                                    />
                                </div>

                            </form>
                        </div>

                    </Card>

                </div>
                : <OtpForm flag={'su'} phoneNumber={phoneno} />}
        </div>
        //  </div >
    );

}

export default withRouter(SignUpForm);
