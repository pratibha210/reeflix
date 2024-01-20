import React, { Component } from 'react';
import './pages.css';
import LoginForm from '../Forms/LoginForm';
import { Route, Switch } from "react-router-dom";
import ForgotPasswordForm from '../Forms/ForgotPasswordForm';
import ResetPasswordForm from '../Forms/ResetPasswordForm';
import SignUpForm from '../Forms/SignUpForm';
import OtpForm from '../Forms/OtpForm';

const AuthPage = (props) => {

    return (
        <div className="reeflix-authpagestart">
            <Switch>
                <Route path={`${props.match.url}/forgotpassword`}
                    component={ForgotPasswordForm} />
                <Route path={`${props.match.url}/resetpassword`}
                    component={ResetPasswordForm} />
                <Route path={`${props.match.url}/otp`}
                    component={OtpForm} />
                <Route path={`${props.match.url}/signup`}
                    component={SignUpForm} />
                <Route path={`${props.match.url}`}
                    component={LoginForm} />

            </Switch>
        </div>
    );

}

export default AuthPage;
