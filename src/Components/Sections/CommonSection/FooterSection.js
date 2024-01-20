// FooterSection
import React, { Component } from 'react';
import './commonsections.css';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { useHistory, NavLink } from 'react-router-dom';

class FooterSection extends Component {

    // goToPrivacy = (props) => {
    //     this.props.history.push('/privacy-policy')
    // };
    //  history = () => useHistory();


    render() {
        return (
            <div className="footersec-start">
                <div className="copyrightpart">
                    <p class="copyrighttxt"><CopyrightIcon className="copyrghtcls"/> Copyright 2020 Reeflix, All Rights Reserved.</p>
                   
                   <div className="bottom-menu">
                   <NavLink to="/policy">
                       <p className="footermenu" >Privacy Policy</p>
                       </NavLink>
                       <NavLink to="/policy/termsofservice">
                       
                       <p className="footermenu">Terms of Service</p>
                       </NavLink>
                   </div>
                   
                    <p class="copyrighttxt"> Designed &amp; Developed by <a href="https://underscoretec.com/"
                        target="_blank" class="copyrightanchor"> Underscoretec
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

export default FooterSection;
