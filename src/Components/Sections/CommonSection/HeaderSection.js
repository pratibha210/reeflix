import React, { Component } from 'react';
import './commonsections.css';
import logo from '../../../Images/reeflix_logo.png'
import DropdownFormField from '../../../Common/FormFields/DropdownFormField'
import { DROPDOWN_MENU } from '../../../AppConfig'
import usrimg from '../../../Images/userimg.png'
import SearchFieldInput from '../../../Common/FormFields/SearchFieldInput';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { __DEV } from "../../../isDev";
import { reeflix_App_key } from "../../../constant";

class HeaderSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active1: true,
            active2: false,
            active3: false,
            active4: false,
            profileOption: DROPDOWN_MENU.profile_dropdown,
            anchorEl: null,
            left: false,
            userData: {},
            search: ''
        };
    }

    componentDidMount() {
        //// for check localstorage data  //////
        if (JSON.parse(localStorage.getItem("userDetails") == null)) {
            this.props.history.replace({
                pathname: "/auth",
                from: "home"
            });
        }
        else {
            __DEV && console.log(localStorage.getItem("userDetails"));

            // let userId =  localStorage.getItem("userId");

            let userId = JSON.parse(localStorage.getItem("userDetails"));
            __DEV && console.log(userId);
            if (userId && Object.keys(userId).length > 0) {
                this.setState({ userData: userId }, () => {
                    __DEV && console.log(this.state.userData);
                });
            }
            else {
                __DEV && console.log("no user data found!!");
            }
        }
    }


    toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ left: !this.state.left });

    }

    activemenu1 = () => {
        this.setState({ active1: true });
        this.setState({ active2: false });
        this.setState({ active3: false });
        this.setState({ active4: false });
        this.props.history.push('/home')
    };
    activemenu2 = () => {
        this.setState({ active1: false });
        this.setState({ active2: true });
        this.setState({ active3: false });
        this.setState({ active4: false });
        this.props.history.push('/home/watchlater')
    };
    activemenu3 = () => {
        this.setState({ active1: false });
        this.setState({ active2: false });
        this.setState({ active3: true });
        this.setState({ active4: false });
        this.props.history.push('/home/favourite')
    };
    activemenu4 = () => {
        this.setState({ active1: false });
        this.setState({ active2: false });
        this.setState({ active3: false });
        this.setState({ active4: true });
        this.props.history.push('/home/plans')
    }
    handleClose = (event) => {
        this.setState({ anchorEl: null })
    }
    handleClick = (event) => {
        __DEV && console.log(event)
        this.setState({ anchorEl: event.currentTarget })
    }
    logoClick = () => {
        this.props.history.push('/home')
    }
    headerClicked = (value) => {
        this.handleClose();
        switch (value) {
            case "profile":
                this.props.history.push('/home/profile');
                break;
            case "favourite":
                this.props.history.push('/home')
                break;
            case "logout":
                this.props.history.replace({
                    pathname: '/auth',
                    from: '/home'
                });
                this.logoutHandle();
                break;

        }
    }
    /// logout function ////
    logoutHandle = () => {
        localStorage.clear();
    }

    

    render() {
        const open = this.state.anchorEl;
        const id = open ? 'simple-popover' : undefined;
        const { profileOption } = this.state;
        return (
            <div>

                <div className="headersection-start">
                    <div className="inner-headersec">
                        <div className="logoraea" onClick={this.logoClick}>
                            <img src={logo} className="headerlogo" alt="" />
                        </div>
                        <div className="navmenuarea hidden-xs">
                            <div className="singlemenu" onClick={this.activemenu1}>
                                <div className={(this.state.active1 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><HomeIcon /> Home</p>
                                </div>
                            </div>
                            <div className="singlemenu" onClick={this.activemenu2}>
                                <div className={(this.state.active2 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><WatchLaterIcon /> Watch Later</p>
                                </div>
                            </div>
                            <div className="singlemenu" onClick={this.activemenu3}>
                                <div className={(this.state.active3 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><FavoriteIcon /> Favourite</p>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-rightpart">
                            <SearchFieldInput onChange={this.props.handleChange}
                             serchbarcls="headersearchbar hidden-xs" />

                            <div className="navmenu navbar-dropdown" onClick={(event) => this.handleClick(event)}>
                                <div className="header-dropdown">
                                    {localStorage && localStorage.getItem("userDetails") !== null ?
                                        <img src={JSON.parse(localStorage.getItem("userDetails")).imageId ? process.env.REACT_APP_apiurl + "/image/download?id=" + JSON.parse(localStorage.getItem("userDetails")).imageId : usrimg} className="useicon" alt="" />
                                        : null}</div>
                                {localStorage && localStorage.getItem("userDetails") !== null ?
                                    <p className="username hidden-xs">{JSON.parse(localStorage.getItem("userDetails")).name}</p> : null}
                                <i class="fa fa-angle-down droparrow"></i>
                            </div>
                            <div className="toggle-menuarea hidden-md">
                                <MenuIcon onClick={this.toggleDrawer('left', false)} />
                            </div>
                        </div>
                    </div>
                    <div className="hidden-md">
                        <SearchFieldInput serchbarcls="headersearchbar" />
                    </div>
                </div>

                <DropdownFormField
                    id={id}
                    open={open}
                    handleClick={this.headerClicked}
                    anchorEl={this.state.anchorEl}
                    handleClose={this.handleClose}
                    dropdownOptions={profileOption.options}
                    dropdownextracls="dropdownnavbar"
                    dropdownanchercls="navbarancher"
                />
                <div>
                    <SwipeableDrawer
                        anchor="left"
                        open={this.state.left}
                        onOpen={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                        swipeAreaWidth={0}
                        className="responsivedrawer"
                    >
                        <div className="innermobieview-menu">
                            <div className="mobiledrawer-header">
                                <div className="logoraea" onClick={this.logoClick}>
                                    <img src={logo} className="headerlogo" alt="" />
                                </div>
                                <CloseIcon className="drawerclose" onClick={this.toggleDrawer('left', false)} />
                            </div>
                            <div className="singlemenu" onClick={this.activemenu1}>
                                <div className={(this.state.active1 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><HomeIcon /> Home</p>
                                </div>
                            </div>
                            <div className="singlemenu" onClick={this.activemenu2}>
                                <div className={(this.state.active2 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><WatchLaterIcon /> Watch Later</p>
                                </div>
                            </div>
                            <div className="singlemenu" onClick={this.activemenu3}>
                                <div className={(this.state.active3 === true ? "active-menu" : " ") + " " + "navmenu"}>
                                    <p className="menuitem"><FavoriteIcon /> Favourite</p>
                                </div>
                            </div>
                        </div>

                    </SwipeableDrawer>

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
    connect(mapStateToProps, mapDispatchToProps)(HeaderSection)
);