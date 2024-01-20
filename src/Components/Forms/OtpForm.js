import React, { Component, useState ,useEffect} from 'react';
import './forms.css';
import TextFieldInput from '../../Common/FormFields/TextFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import Card from '@material-ui/core/Card';
import logo from '../../Images/reeflix_logo.png'
import { NavLink, withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useSelector, useDispatch } from "react-redux"
import { __DEV } from "../../isDev";
import { reeflix_App_key } from "../../constant";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ReactGA from 'react-ga';


const OtpForm = (props) => {

    __DEV && console.log(props);

    const [data, setData] = useState({});
    const [suffixUrl,setSuffixUrl]= React.useState('');
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [loading, setloading] = useState({ load: false });

    const dispatch = useDispatch()


    useEffect(()=>{

        if(props.flag == "su"){

            setSuffixUrl('/user/accountactivation')


        }else{

            setSuffixUrl('/user/verifyotp')


        }


    },[props.flag])


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
                    "phoneNumber": props.phoneNumber,
                    "otp": data.otp

                }),
                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };

            
            fetch(process.env.REACT_APP_apiurl + suffixUrl, reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    setloading({ load: false })
                    if (!result.error) {

                        if(props.flag === 'fp'){

                        //////// push to home after successfully verify otp ////
                        props.history.push('/auth/resetpassword', result);
                        }else{

                        __DEV && console.log(result.result);
                        // localStorage.setItem("userId", result.result._id);
                        localStorage.setItem('userDetails', JSON.stringify(result.result)); //will not use when reducer part for user wilbe completed
                        localStorage.setItem('userId', JSON.stringify(result.result._id));
                        dispatch({ type: 'LOGGED_USER_DETAILS', data: result.result });

                        ReactGA.event({
                            category: 'User',
                            action: 'Registration-success',
                            label: props.phoneNumber,
                            value: props.phoneNumber
                        })

                        props.history.replace("/home");

                        }

                    } else {

                        ///// useState for show result's err message///

                        if(props.flag === 'su'){

                            ReactGA.event({
                                category: 'User',
                                action: 'Registration-failure',
                                label: props.phoneNumber + ':' + result.message,
                                value: props.phoneNumber + ':' + result.message
                            })

                      
                        }
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

                    let data = {
                        message: "Incorrect OTP entered!!"
                    }

                    if(props.flag === 'su'){


                        ReactGA.event({
                            category: 'User',
                            action: 'Registration-failure',
                            label:props.phoneNumber + ':' + data.message,
                            value: props.phoneNumber + ':' + data.message
                        })

                    }
                    setloading({
                        load: false

                    })
                  
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
            <div className="inerformfield">
                <div className="authlogoarea"
                >
                    <NavLink to="/home">
                        <img src={logo} className="headerlogo" alt="logo" />
                    </NavLink>
                </div>
                <Card className="formcard-start forgotpswrd-card">

                    


                        <form className="login-innerform">

                            <h3 className="formheading">
                                OTP Verification
                        </h3>
                            <p className="forgotpaswrdtxt">
                                Please enter OTP that has been send to your given mobile , to verify it.
                        </p>
                            <div className="formfieldcls">
                                <TextFieldInput textnewclass="loginform-field"
                                    textinputname="otp"
                                    textinputType="number"
                                    placeholder="Enter OTP"
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={
                                        error.textField && error.textField === "otp"
                                            ? true
                                            : false
                                    }
                                    errorText={
                                        error.textField && error.textField === "otp"
                                            ? error.message
                                            : null
                                    } clickLogin={verifyOtp}
                                />
                            </div>

                            <div className="loginbutn-area">
                                {err.showtexterr === true ? <div className="formerrormsg-area"><p className="formerrortxt"> {err.texterr}</p></div>
                                : null}
                                <ButtonComponent buttontext="SUBMIT" buttonextraclass="loginbuttn"
                                    handleClick={verifyOtp} loading={loading.load}
                                />
                            </div>
                        </form>
                    
                </Card>

            </div>
        </div>
    );
}



export default withRouter(OtpForm);
