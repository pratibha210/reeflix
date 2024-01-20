import React, { Component } from 'react';
import '../sections.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import play from '../../../Images/play.png';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import { __DEV } from "../../../isDev";

class HomeBannerSectionv2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerListArr: [],

        }

    }

    componentWillReceiveProps(newProps) {
        /////////////to receive categories list  from reducer////////////
         __DEV && console.log(newProps.bannerList)
        if (!Object.is(newProps.bannerList, this.props.bannerList)) {
            this.setState({ bannerListArr: newProps.bannerList }, () => {
                 __DEV && console.log(this.state.bannerListArr);
            })
        }

    }

    componentDidMount() {

        this.setState({ bannerListArr: this.props.bannerList }, () => {
             __DEV && console.log(this.state.bannerListArr);
        })


    }

    goToDetails = (contentId) => {

        // this.props.actions.sectionDetails(contentId);
        this.props.history.push(`/home/details/${contentId}`);


    }



    render() {
        return (
            <div className="homepagesection-start">
                <div className="homepage-bannerpart">
                    <Carousel centerMode={window.innerWidth === 360 ? false : true} centerSlidePercentage={53}
                        showIndicators={false}
                        infiniteLoop useKeyboardArrows
                        showThumbs={false} showStatus={false}>
                        {this.state.bannerListArr.length > 0 && this.state.bannerListArr.map(list => {
                            return (
                                <div>


                                    <div className="firstslider" onClick={() => this.goToDetails(list._id)}>
                                        <img src={process.env.REACT_APP_apiurl+"/file/getResizedImage?width=682&height=415&key="+list.thumbnail2+"&fit=cover"} alt="img04" />
                                        <div className="overlaydiv">
                                            <div className="inneroverlaydiv">
                                                <p className="shownameinbanner">{list.title}</p>

                                                {Array.isArray(list.genre) && list.genre.map(genreName => {
                                                    return (
                                                        <p className="showlanguage">

                                                            <span className="language1">{genreName}</span>
                                                        </p>
                                                    )
                                                })}

                                                <p className="shortdetail">{list.description} </p>
                                            </div>
                                            <div className="showsplaydiv banner-showsplaydiv">
                                                <img src={play} className="playbtn" alt="play" />
                                            </div>
                                        </div>
                                        {list.premium ===true ?
                                        <div className="premiumdivstart">
                                            <StarIcon className="premiumstarcss" />
                                            <p className="premiumtag">Premium</p>
                                        </div>
                                       :null }
                                    </div>

                                </div>

                            )
                        })}
                    </Carousel>
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
    connect(mapStateToProps, mapDispatchToProps)(HomeBannerSectionv2)
);