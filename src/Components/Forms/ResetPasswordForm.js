// ResetPasswordForm
import React, { useEffect, Component, useState } from 'react';
import './forms.css';
import TextFieldInput from '../../Common/FormFields/TextFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import Card from '@material-ui/core/Card';
import logo from '../../Images/reeflix_logo.png'
import { NavLink, withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { useSelector, useDispatch } from "react-redux"
import { __DEV } from "../../isDev";
import { reeflix_App_key } from "../../constant";

const ResetPasswordForm = (props) => {

    const [data, setData] = useState({});
    const [phoneno, setphoneno] = useState({});
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [loading, setloading] = useState({ load: false });

    ////// for received userdata data from forgotPasswordscreen ////
    useEffect(() => {

        if (phoneno)
             __DEV && console.log(props.location.state);
        setphoneno(props.location.state);


    }, [phoneno]);

    /////////chnagePassword API call function /////////
    const chnagePassword = () => {
       __DEV && console.log(data);
        ///// field validation for  password///
        if (!data.password) {
            setError({

                message: " Please enter password",
                showerror: true,
                textField: "password"
            })
            setErr({

                showtexterr: false

            })

        }
        ///// field validation for confirmPassword///


        else if (!data.confirmPassword) {
            setError({

                message: " Please enter confirmPassword",
                showerror: true,
                textField: "confirmPassword"
            })
            setErr({

                showtexterr: false

            })

        }
        else if (data.password !== data.confirmPassword) {
            setError({

                message: "Password and ConfirmPassword do not matching!!",
                showerror: true,
                textField: "confirmPassword"
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
                    "phoneNumber": phoneno.result.phoneNumber,
                    "password": data.password

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + " " + phoneno.token
                }
            };
            __DEV && console.log(reqValues);
            fetch(process.env.REACT_APP_apiurl + "/user/passwordChange", reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    ///// for loading false///
                    setloading({ load: false })
                    if (!result.error) {
                        __DEV && console.log(result.result);
                        //////// push to auth after successfully reset password ////
                        props.history.replace('/auth');

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

        __DEV && console.log(data)

    }


    return (
        <div className="formstartcls">
        <div className='loginoverlay'></div>
            <div className="inerformfield">
                <div className="authlogoarea"
                >
                    <NavLink to="/home">
                        <img src={logo} className="headerlogo" alt="logo" />
                    </NavLink>
                </div>
                <Card className="formcard-start">
                    <form className="login-innerform">
                        <h3 className="formheading">Reset your password?</h3>
                        {err.showtexterr === true ? <div className="formerrormsg-area"><p className="formerrortxt"> {err.texterr}</p></div>
                            : null}
                        <div className="formfieldcls">
                            <TextFieldInput textnewclass="loginform-field"
                                textinputname="password" textinputType="password"
                                placeholder="New password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }} error={
                                    error.textField && error.textField === "password"
                                        ? true
                                        : false
                                }
                                errorText={
                                    error.textField && error.textField === "password"
                                        ? error.message
                                        : null
                                } onChange={handleChange} clickLogin={chnagePassword}
                            />
                        </div>
                        <div className="formfieldcls">
                            <TextFieldInput textnewclass="loginform-field"
                                textinputname="confirmPassword" textinputType="password"
                                placeholder="Confirm password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }} error={
                                    error.textField && error.textField === "confirmPassword"
                                        ? true
                                        : false
                                }
                                errorText={
                                    error.textField && error.textField === "confirmPassword"
                                        ? error.message
                                        : null
                                } onChange={handleChange} clickLogin={chnagePassword}
                            />
                        </div>
                        <div className="loginbutn-area">
                            <ButtonComponent buttontext="SUBMIT" buttonextraclass="loginbuttn"
                                handleClick={chnagePassword}
                                loading={loading.load}
                            />
                        </div>
                        <p className="forsignuptxt"><NavLink to="/home" className="linktext gotoback">Go to home</NavLink></p>
                    </form>
                </Card>

            </div>
        </div>
    );
}

export default withRouter(ResetPasswordForm);
