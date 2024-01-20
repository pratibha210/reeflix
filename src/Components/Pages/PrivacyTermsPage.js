import React, { Component } from 'react';
import './pages.css';
import { Route, Switch } from "react-router-dom";
import PrivacyTermsHeader from '../Sections/CommonSection/PrivacyTermsHeader';
import FooterSection from '../Sections/CommonSection/FooterSection';
import PrivacyPolicySection from '../Sections/PrivacyPolicySection';
import TermsServiceSection from '../Sections/TermsServiceSection';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class PrivacyTermsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    changeText = e => {
        this.setState({ search: e.target.value }, () => {
            this.searchContent(this.state.search);
        });
    };

  
        
    render() {
        return (
            <div className="reeflix-homepagestart">
                <PrivacyTermsHeader handleChange={this.changeText} />
                <Switch>


                    <Route path={`${this.props.match.url}/termsofservice`}
                        component={TermsServiceSection} />

                    <Route path={`${this.props.match.url}`}
                        component={PrivacyPolicySection} />

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
    connect(mapStateToProps, mapDispatchToProps)(PrivacyTermsPage)
);