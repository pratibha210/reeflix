import React, { useEffect, Component, useState, usePrevious } from 'react';
import './forms.css';
import TextFieldInput from '../../Common/FormFields/TextFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import Card from '@material-ui/core/Card';
import logo from '../../Images/reeflix_logo.png'
import { NavLink, withRouter } from 'react-router-dom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import signIn from "../../redux/Action";
import { useSelector, useDispatch } from "react-redux"
import { __DEV } from "../../isDev";
import { reeflix_App_key } from "../../constant";
import ReactGA from 'react-ga';

const LoginForm = (props) => {
    const [userId, setUserId] = useState({})
    const [loginData, setLoginData] = useState({});
    const dispatch = useDispatch()
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [loading, setloading] = useState({ load: false });


    const [state, setState] = React.useState({
        open: false,
    });
    const { vertical, horizontal, open } = state;

    const notificationClick = newState => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };



    useEffect(() => {
        /////get userDetails from localstorage ////
        if (JSON.parse(localStorage.getItem("userDetails") !== null)) {
            props.history.replace("/home")
        }
        else {

            __DEV && console.log(userId);
        }


    })
    ////// API call function for login //////
    const loginClick = () => {

        __DEV && console.log(loginData);
        ///// field validation for  email/ phonenumber///
        if (!loginData.phoneNumber) {
            setError({

                message: " Please enter Email/Phone Number",
                showerror: true,
                textField: "phoneNumber"
            })

        }
        ///// field validation for  email format///
        // else if (!loginData.phoneNumber.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        //     setError({
        //         textField: "phoneNumber",
        //         showerror: true,
        //         message: 'Invalid email id.'
        //     })
        // }
        ///// field validation for  password///
        else if (!loginData.password) {
            setError({

                message: " Please enter password",
                showerror: true,
                textField: "password"
            })

        }
        else {
            setloading({ load: true })
            ///////// API calling from here//////
            const reqValues = {
                method: "POST",
                body: JSON.stringify({
                    "phoneNumber": loginData.phoneNumber,
                    "password": loginData.password

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };

            fetch(process.env.REACT_APP_apiurl + "/user/login", reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    setloading({ load: false })
                    if (!result.error) {
                        /// savee user id in localstorage ///
                        localStorage.setItem('userDetails', JSON.stringify(result.result)); //will not use when reducer part for user wilbe completed
                        localStorage.setItem('userId', JSON.stringify(result.result._id));

                        ReactGA.event({
                            category: 'User',
                            action: 'Login-success',
                            label: loginData.phoneNumber,
                            value: loginData.phoneNumber
                        })
                        // localStorage.setItem("userId", result.result._id);
                        //////// push to home after successfully login ////
                        props.history.replace("/home");
                        dispatch({ type: 'LOGGED_USER_DETAILS', data: result.result });
                    } else {
                        ///// useState for show result's err message///
                        ReactGA.event({
                            category: 'User',
                            action: 'Login-failure',
                            label: loginData.phoneNumber,
                            value: loginData.phoneNumber
                        })
                        setErr({

                            texterr: result.message,
                            showtexterr: true

                        })

                    }
                })
                .catch(err => {
                    ReactGA.event({
                        category: 'User',
                        action: 'Login-failure',
                        label: loginData.phoneNumber,
                        value: loginData.phoneNumber
                    })
                    setloading({ load: false })
                    ///// useState for show  err message///
                    setErr({

                        texterr: err.message,
                        showtexterr: true

                    })
                    __DEV && console.log(err)
                });
        };

    };
    /////// onChange function ////////
    const handleChange = (name, val) => {
        setLoginData(prev => {
            return {
                ...prev,
                [name]: val
            }

        });

        __DEV && console.log(loginData)

    }


    return (
        <div className="formstartcls">
            <div className='loginoverlay'></div>
            <div className="inerformfield">
                <div className="authlogoarea"
                // onClick={logoClick}
                >
                    <NavLink to="/home">
                        <img src={logo} className="headerlogo" alt="logo" />
                    </NavLink>
                </div>
                <Card className="formcard-start">

                    <form className="login-innerform">
                        <h3 className="formheading">Please Identify Yourself</h3>
                        {err.showtexterr === true ? <div className="formerrormsg-area"><p className="formerrortxt"> {err.texterr}</p></div>
                            : null}

                        <div className="formfieldcls">
                            <TextFieldInput textnewclass="loginform-field"
                                placeholder="Mobile Number"
                                textinputname="phoneNumber" textinputType="text"
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PermIdentityIcon />
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
                                } clickLogin={loginClick}
                            />
                        </div>
                        <div className="formfieldcls">
                            <TextFieldInput textnewclass="loginform-field"
                                placeholder="Password"
                                textinputname="password" textinputType="password"
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                error={
                                    error.textField && error.textField === "password"
                                        ? true
                                        : false
                                }
                                errorText={
                                    error.textField && error.textField === "password"
                                        ? error.message
                                        : null
                                } clickLogin={loginClick}
                            />
                            <p className="forgotpswrd-txt">Forgot Password? <NavLink to="/auth/forgotpassword" className="linktext">Click here</NavLink></p>
                        </div>
                        <div className="loginbutn-area">

                            <ButtonComponent buttontext="SIGN IN" buttonextraclass="loginbuttn"
                                handleClick={loginClick} loading={loading.load}
                            />

                        </div>
                        <p className="forsignuptxt">Not a member?<NavLink to="/auth/signup" className="linktext"> Sign Up</NavLink></p>

                    </form>
                </Card>

            </div>
        </div>
    );
}

export default withRouter(LoginForm);
