import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Components/Pages/HomePage';
import PayUstatusPage from './Components/Pages/PayUstatusPage';
import AuthPage from './Components/Pages/AuthPage';
import ScrollToTop from './ScrollToTop';
import ReactGA from 'react-ga';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import HeaderSection from './Components/Sections/CommonSection/HeaderSection';
import PrivacyPolicySection from '../src/Components/Sections/PrivacyPolicySection';
import PrivacyTermsPage from './Components/Pages/PrivacyTermsPage';
function App(props) {
  const [initialLoad, setInitialLoad] = useState(false)

  ReactGA.initialize(process.env.REACT_APP_GA);

  useEffect(() => {
    if (!initialLoad) {
      ReactGA.pageview(props.location.pathname);
      setInitialLoad(true)
    }
  }, [])

  props.history.listen((location) => {
    if (location.pathname.includes('/details')) {
      let rootURL = location.pathname.split('/')[1]
      let contentPage = location.pathname.split('/')[3]

      let pageHit = `/${rootURL}/${contentPage}`
      ReactGA.pageview(pageHit)
    } else {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname)
    }
  });

  return (
    <ScrollToTop>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/policy' component={PrivacyTermsPage} />
        <Route path='/auth' component={AuthPage} />
        <Route path='/paymentStatus' component={PayUstatusPage} />

     
        <Route path='' render={() => (<Redirect to="/auth" />)} />
      </Switch>
      


    </ScrollToTop>
  );
}

export default withRouter(App);
