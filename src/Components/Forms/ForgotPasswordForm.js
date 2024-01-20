import React, { Component, useState } from 'react';
import './forms.css';
import TextFieldInput from '../../Common/FormFields/TextFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import Card from '@material-ui/core/Card';
import logo from '../../Images/reeflix_logo.png'
import { NavLink, withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useSelector, useDispatch } from "react-redux"
import { __DEV } from "../../isDev";
import { reeflix_App_key } from "../../constant";
import OtpForm from './OtpForm';


const ForgotPasswordForm = (props) => {
    const [showstate, setShowstate] = React.useState(false);
    const [data, setData] = useState({});
    const [phoneno, setPhoneno] = useState('');
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [loading, setloading] = useState({ load: false });

    /////////API call function forgotPassword /////////
    const forgotPassword = () => {
        if (!data.phoneNumber) {
            setError({

                message: " Please enter PhoneNumber",
                showerror: true,
                textField: "phoneNumber"
            })
            setErr({

                showtexterr: false

            })
        }
        else {
            setloading({ load: true })
            ///////// API calling from here//////
            const reqValues = {
                method: "PUT",
                body: JSON.stringify({
                    "phoneNumber": data.phoneNumber,

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };

            fetch(process.env.REACT_APP_apiurl + "/user/forgotpasswordotp", reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    setloading({ load: false })
                    if (!result.error) {
                        __DEV && console.log(result.result)
                        let phoneno = result.result.phoneNumber
                        setPhoneno(phoneno);
                        __DEV && console.log(phoneno);
                        ////for show otp page /////
                        setShowstate(true)

                    } else {
                        ///// useState for show result's err message///
                        setErr({
                            showerror: false,
                            texterr: result.message,
                            showtexterr: true

                        })
                        setError({

                            showerror: false,

                        })

                    }
                })
                .catch(err => {
                    setloading({
                        load: false

                    })
                    ///// useState for show  err message///
                    setErr({

                        texterr: err.message,
                        showtexterr: true

                    })
                    setError({

                        showerror: false,

                    })
                    __DEV && console.log(err)
                });
        };
    };


    /////////OTP verify API call function /////////
    const verifyOtp = () => {
        if (!data.otp) {
            setError({

                message: " Please enter OTP",
                showerror: true,
                textField: "otp"
            })
            setErr({

                showtexterr: false

            })
        }
        else {

            setloading({ load: true })
            ///////// API calling from here//////
            const reqValues = {
                method: "PUT",
                body: JSON.stringify({
                    "phoneNumber": phoneno,
                    "otp": data.otp

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };

            fetch(process.env.REACT_APP_apiurl + "/user/verifyotp", reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    setloading({ load: false })
                    if (!result.error) {

                        //////// push to home after successfully verify otp ////
                        props.history.push('/auth/resetpassword', result);

                    } else {
                        ///// useState for show result's err message///
                        setErr({

                            texterr: result.message,
                            showtexterr: true

                        })
                        setError({

                            showerror: false,

                        })

                    }
                })
                .catch(err => {
                    setloading({
                        load: false

                    })
                    let data = {
                        message: "Incorrect OTP entered!!"
                    }
                    ///// useState for show  err message///
                    setErr({


                        texterr: data.message,
                        showtexterr: true

                    })
                    setError({

                        showerror: false,

                    })
                    __DEV && console.log(err)
                });
        }
    };





    /////// onChange function ////////
    const handleChange = (name, val) => {
        setData(prev => {
            return {
                ...prev,
                [name]: val
            }

        });
        __DEV && console.log(val)

        __DEV && console.log(data)

    }
   


    return (
        <div className="formstartcls forgotpasswordmaincls">
        <div className='loginoverlay'></div>
             {showstate !== true ?
            <div className="inerformfield">
                <div className="authlogoarea"
                >
                    <NavLink to="/home">
                        <img src={logo} className="headerlogo" alt="logo" />
                    </NavLink>
                </div>
                <Card className="formcard-start forgotpswrd-card">

                   
                        {/* // -------Forgot Password Form strat------- */}
                        <form className="login-innerform">
                            {err.showtexterr === true ? <div className="formerrormsg-area"><p className="formerrortxt"> {err.texterr}</p></div>
                                : null}
                            <h3 className="formheading">Did you forgot your password?</h3>
                            <p className="forgotpaswrdtxt"> Please enter your registered PhoneNumber and follow
                                instructions sent on your Phone.
                        </p>
                            <div className="formfieldcls">

                                <TextFieldInput textnewclass="loginform-field"
                                    textinputname="phoneNumber" textinputType="number"
                                    onChange={handleChange} clickLogin={forgotPassword}
                                    placeholder="Enter Your Phone Number..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                />
                            </div>

                            <div className="loginbutn-area">

                                <ButtonComponent buttontext="SUBMIT" buttonextraclass="loginbuttn"
                                    handleClick={forgotPassword} loading={loading.load}
                                />

                            </div>
                            <p className="forsignuptxt">Do you remember your password ? <NavLink to="/auth" className="linktext">Try logging in</NavLink></p>
                        </form> 

                        
                </Card>

            </div>
            :
            <OtpForm flag={'fp'} phoneNumber = {phoneno}/>
                }
        </div>
    );
}

export default withRouter(ForgotPasswordForm);
