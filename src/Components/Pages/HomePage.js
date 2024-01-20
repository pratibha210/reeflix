import React, { Component } from 'react';
import './pages.css';
import { Route, Switch } from "react-router-dom";
import HomePageScreen from '../Screens/HomePageScreen';
import WatchLaterScreen from '../Screens/WatchLaterScreen';
import HeaderSection from '../Sections/CommonSection/HeaderSection';
import ViewallSection from '../Sections/HomeSection/ViewallSection';
import SearchSection from '../Sections/HomeSection/SearchSection';
import DetailSection from '../Sections/HomeSection/DetailSection';
import PlaySection from '../Sections/HomeSection/PlaySection';
import FavouriteScreen from '../Screens/FavouriteScreen';
import FooterSection from '../Sections/CommonSection/FooterSection';
import EditProfileSection from '../Sections/ProfileSection/EditProfileSection';
import ProfileSectionv2 from '../Sections/ProfileSection/ProfileSectionv2';
import PrivacyPolicySection from '../Sections/PrivacyPolicySection';
import TermsServiceSection from '../Sections/TermsServiceSection';

import { bindActionCreators } from "redux";
import * as actioncreators from "../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reeflix_App_key } from "../../constant";
import { __DEV } from "../../isDev";
import { useRadioGroup } from '@material-ui/core';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("userId"));
        __DEV && console.log(user, 'L35>>>')
        if (user) {
            this.props.actions.getuserByUserId(user);
        }
    }

    changeText = e => {
        this.setState({ search: e.target.value }, () => {
            this.searchContent(this.state.search);
        });
    };

    //function call for search Content
    searchContent = (sentence) => {
        __DEV && console.log(sentence);
        const reqValues = {
            method: "GET",

            headers: {
                "key": reeflix_App_key,
                "Content-Type": "application/json"
            }
        };
        // __DEV && console.log(reqValue)
        fetch(process.env.REACT_APP_apiurl + "/content/textsearch?text=" + sentence, reqValues)
            .then(result => result.json())

            .then(result => {
                if (!result.error) {
                    __DEV && console.log(result.result);

                    this.props.actions.searchContentList(result.result);

                    this.props.history.push('/home/searchall');

                }

                else {
                    __DEV && console.log(result.message);
                }

            })
            .catch(err => {
                __DEV && console.log("Error", err);
            });
    };

    render() {
        return (
            <div className="reeflix-homepagestart">
                <HeaderSection handleChange={this.changeText} />
                <Switch>
                    <Route path={`${this.props.match.url}/details/:id`}
                        component={DetailSection} />
                    <Route path={`${this.props.match.url}/play`}
                        component={PlaySection} />
                    <Route path={`${this.props.match.url}/viewall`}
                        component={ViewallSection} />
                    <Route path={`${this.props.match.url}/searchall`}
                        component={SearchSection} />
                    <Route path={`${this.props.match.url}/watchlater`}
                        component={WatchLaterScreen} />
                    <Route path={`${this.props.match.url}/favourite`}
                        component={FavouriteScreen} />
                    <Route path={`${this.props.match.url}/profile`}
                        component={ProfileSectionv2} />
                    <Route path={`${this.props.match.url}/editprofile`}
                        component={EditProfileSection} />


                    <Route path={`${this.props.match.url}`}
                        component={HomePageScreen} />
                </Switch>
                <FooterSection />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

function mapDispatchToProps(dispatch, state) {
    return {
        actions: bindActionCreators(actioncreators, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomePage)
);