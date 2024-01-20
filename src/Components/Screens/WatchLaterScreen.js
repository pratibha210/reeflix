import React, { Component } from 'react';
import './screen.css';
import ViewallSection from '../Sections/HomeSection/ViewallSection';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NoDataFoundComponent from '../../Common/UIComponents/NoDataFoundComponent';
import { __DEV } from "../../isDev";
class WatchLaterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            watchlaterList: []

        }
    }

    componentDidMount(){

        let userId = JSON.parse(localStorage.getItem("userDetails"));
         __DEV && console.log(userId._id);

        this.props.actions.getAllWatchLaterList(userId._id)
         __DEV && console.log(this.props.watchlaterlistdata)
    }
    componentWillReceiveProps(newProps) {
        /////////////to receive  list  from reducer////////////

        if (!Object.is(newProps.watchlaterlistdata, this.props.watchlaterlistdata)) {
            this.setState({ watchlaterList: newProps.watchlaterlistdata }, () => {
                 __DEV && console.log(this.state.watchlaterList);
            })
        }


    }


    render() {
        return (
            <div>
                {(this.state.watchlaterList).length>0 ?
                <ViewallSection remove label  watchFlag
                menuarea={false} 
                />
              :  <NoDataFoundComponent nodatatext="No Results found !!!" />}
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
    connect(mapStateToProps, mapDispatchToProps)(WatchLaterScreen)
  );

