import React, { Component } from 'react';
import './screen.css';
import HomeSeriesSection from '../Sections/HomeSection/HomeSeriesSection';
import HomeBannerSectionv2 from '../Sections/HomeSection/HomeBannerSectionv2';
import BannerSkeleton from '../Sections/HomeSection/BannerSkeleton';
import NoDataFoundComponent from '../../Common/UIComponents/NoDataFoundComponent';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../redux/Action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SeriesSkeleton from '../Sections/HomeSection/SeriesSkeleton';
import { __DEV } from "../../isDev";
class HomePageScreen extends Component {
  constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            bannerListArr: [],
            message:''

        }
    }

    componentDidMount() {
        
        /** for check localstorage data */
        __DEV && console.log(localStorage.getItem("userDetails"));
        if ( JSON.parse(localStorage.getItem("userDetails") === null)) {
            this.props.history.replace('/auth');
            //     {
            //     pathname: "/auth",
            //     from: "/home"
            //   });
        }
        else {
             __DEV && console.log(localStorage.getItem("userDetails"));
        
        /**get user's _id from localStorage */
        let userId = JSON.parse(localStorage.getItem("userDetails"));
         __DEV && console.log(userId._id);

        /**call get all categories api */
        this.props.actions.getAllCategoires(userId._id);
    }
}

    componentWillReceiveProps(newProps) {
     
        /**to receive categories list from reducer
         * @categoriesList : reducres of categoriesList
         */
         __DEV && console.log(newProps.categoriesList)
        if (!Object.is(newProps.categoriesList, this.props.categoriesList)) {
            this.setState({ categoriesList: newProps.categoriesList }, () => {
                 __DEV && console.log(this.state.categoriesList);
            })
        }

        /**to receive categories list  from reducer
         * @bannerList : reducres of banners
         */
         __DEV && console.log(newProps.bannerList)
        if (!Object.is(newProps.bannerList, this.props.bannerList)) {
            this.setState({ bannerListArr: newProps.bannerList }, () => {
                 __DEV && console.log(this.state.bannerListArr);
            })
        }
         /**to receive errorMessage from reducer
         * @errorMessage : reducres of errorMessage
         */
        if (!Object.is(newProps.errorMessage, this.props.errorMessage)) {
            this.setState({ message: newProps.errorMessage }, () => {
                 __DEV && console.log(this.state.message);
            })
        }

    }

    render() {
       
        return (
            <div>

                {this.state.bannerListArr.length > 0 && this.state.categoriesList.length > 0 ?
                
                    <div>
                        <HomeBannerSectionv2 />
                        <HomeSeriesSection />
                    </div>:
                     this.state.message && this.state.message?
                  <NoDataFoundComponent nodatatext="No Results found !!!" />
                : <div className="homeskeleton">
                    <BannerSkeleton />
                    <SeriesSkeleton />
                 </div> }
               
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
    connect(mapStateToProps, mapDispatchToProps)(HomePageScreen)
);

