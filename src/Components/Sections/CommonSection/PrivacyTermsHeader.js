import React, { Component } from 'react';
import './commonsections.css';
import logo from '../../../Images/reeflix_logo.png'
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { __DEV } from "../../../isDev";

class PrivacyTermsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

   
  
    logoClick = () => {
        this.props.history.push('/home')
    }
   
    
    

    render() {
        return (
            <div>

                <div className="headersection-start">
                    <div className="inner-headersec">
                        <div className="logoraea" onClick={this.logoClick}>
                            <img src={logo} className="headerlogo" alt="" />
                        </div>
                        

                        
                    </div>
                   
                </div>

               
                
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
    connect(mapStateToProps, mapDispatchToProps)(PrivacyTermsHeader)
);