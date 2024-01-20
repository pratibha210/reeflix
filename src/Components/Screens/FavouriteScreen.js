import React, { Component } from 'react';
import './screen.css';
import ViewallSection from '../Sections/HomeSection/ViewallSection';
import NoDataFoundComponent from '../../Common/UIComponents/NoDataFoundComponent';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../redux/Action";
import { connect } from "react-redux";
import {withRouter } from "react-router-dom";
import { __DEV } from "../../isDev";

class FavouriteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favouriteList: [],
            falg: "favourite"

        }
    }

    componentDidMount(){

        //// for check localstorage data  //////
        if (localStorage && localStorage.getItem("userDetails") === null) {
            this.props.history.push({
                pathname: "/auth",
                from: "home"
              });
        }
        else {
             __DEV && console.log(localStorage.getItem("userDetails"));
        
        let userId = JSON.parse(localStorage.getItem("userDetails"));
         __DEV && console.log(userId._id);

        this.props.actions.getAllfavouriteList(userId._id)
         __DEV && console.log(this.props.favouritelistdata);
    }
}
    componentWillReceiveProps(newProps) {
        /////////////to receive categories list  from reducer////////////

        if (!Object.is(newProps.favouritelistdata, this.props.favouritelistdata)) {
            this.setState({ favouriteList: newProps.favouritelistdata }, () => {
                 __DEV && console.log(this.state.favouriteList);
            })
        }

    }

    render() {
        return (
            <div>{(this.state.favouriteList).length > 0 ?
               <ViewallSection falg remove label  menuarea={false}/>:
              <NoDataFoundComponent nodatatext="No Results found !!!" />}
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
    connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen)
  );

