import React, { Component } from 'react';
import '../sections.css';
import Grid from '@material-ui/core/Grid';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import RelatedShowSection from './RelatedShowSection';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import * as constant from "../../../constant";
import * as moment from "moment";
import PlayVideoComponent from '../../../Common/UIComponents/PlayVideoComponent';
import StarIcon from '@material-ui/icons/Star';
import { __DEV } from "../../../isDev";
import AdSense from 'react-adsense';

class DetailSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            contentDetails: {},
            open: true,
            activeWatch: true,
            onProgress:false,
            userId: JSON.parse(localStorage.getItem("userDetails"))

        };
    }
    clickWatchLater = (contentId) => {

        /// call add watch later api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": constant.reeflix_App_key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "userId": this.state.userId,
                "contentId": contentId
            })
        };
         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/watchlist/add", reqValues)
            .then(result => result.json())
            .then(result => {

                 __DEV && console.log(result);
                if (!result.error) {

                     __DEV && console.log(result.result);
                    this.setState({ activeWatch: false });

                }

                else {
                     __DEV && console.log(result.message);
                    this.setState({ message: result.message })

                }

            })
            .catch(err => {
                 __DEV && console.log(err);
                this.setState({ message: err.message })

            });

    }
    addToFavourite = (contentId) => {

        /// call add favourites api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": constant.reeflix_App_key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "userId": this.state.userId,
                "contentId": contentId
            })
        };
         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/favourite/add", reqValues)
            .then(result => result.json())
            .then(result => {

                 __DEV && console.log(result);
                if (!result.error) {

                     __DEV && console.log(result.result);
                    this.setState({ active: true });

                }

                else {
                     __DEV && console.log(result.message);
                    this.setState({ message: result.message })

                }

            })
            .catch(err => {
                 __DEV && console.log(err);
                this.setState({ message: err.message })

            });

    }

    removeToFavourites = (contentId) => {

        /// call remove favourites api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": constant.reeflix_App_key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "userId": this.state.userId,
                "contentId": contentId
            })
        };
         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/favourite/remove", reqValues)
            .then(result => result.json())
            .then(result => {

                 __DEV && console.log(result);
                if (!result.error) {

                     __DEV && console.log(result.result);
                    this.setState({ active: false });

                }

                else {
                     __DEV && console.log(result.message);
                    this.setState({ message: result.message })

                }

            })
            .catch(err => {
                 __DEV && console.log(err);
                this.setState({ message: err.message })

            });


    }

    removeWatchLater = (contentId) => {

        /// call remove watch later api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": constant.reeflix_App_key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "userId": this.state.userId,
                "contentId": contentId
            })
        };
         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/watchlist/remove", reqValues)
            .then(result => result.json())
            .then(result => {

                 __DEV && console.log(result);
                if (!result.error) {

                     __DEV && console.log(result.result);
                    this.setState({ activeWatch: true });

                }

                else {
                     __DEV && console.log(result.message);
                    this.setState({ message: result.message })

                }

            })
            .catch(err => {
                 __DEV && console.log(err);
                this.setState({ message: err.message })

            });



    }
    handleTooltipOpen = () => {
        this.setState({ open: true });
    }

    viewAll = (data) => {
        __DEV && console.log(data);
        this.props.actions.seriesEpisode(data);
        this.props.history.push('/home/viewall')
    }

    componentDidMount() {


        const { id } = this.props.match.params
        __DEV && console.log(id);

        let contentId = id;


        if (this.props.watchList.includes(contentId)) {

            this.setState({ activeWatch: false })
        }

        if (this.props.favouriteList.includes(contentId)) {

            this.setState({ active: true })
        }

        this.callContent(contentId);
       

    }

    componentWillReceiveProps(newProps){

        const { id } = newProps.match.params
        __DEV && console.log(id);

        let contentId = id;

        this.callContent(contentId);



    }

    callContent = (contentId)=>{

         /// call get all categories api //////
         const reqValues = {
            method: "GET",

            headers: {
                "key": constant.reeflix_App_key,
                "Content-Type": "application/json"
            }
        };
         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/content/getById?id=" + contentId, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    __DEV && console.log(result.result);
                    this.setState({ contentDetails: result.result },()=>{

                        __DEV && console.log(this.state.contentDetails.type);


                    });

                }

                else {
                     __DEV && console.log(result.message);
                    this.setState({ message: result.message })

                }

            })
            .catch(err => {
                 __DEV && console.log(err);
                this.setState({ message: err.message })

            });
    }

   

    render() {
        return (
            <div className="sectiondetailpartstart">

                <div className="sectiondetailinner">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <div className="">
                                <div className="detailsshowimage">
                                    {/* <AdSense.Google
                                    client='ca-pub-5013055896004495'
                                    slot='7672829826'
                                    style={{ display: 'block' }}
                                    format='auto'
                                    responsive='true'
                                    /> */}
                                    <PlayVideoComponent title={this.state.contentDetails.title} url = {this.state.contentDetails.sources && this.state.contentDetails.sources.hls} hlsUrl = {this.state.contentDetails.type === "series" ? this.state.contentDetails.episodes.length > 0 && this.state.contentDetails.episodes:[]} premium = {this.state.contentDetails.premium} amount ={this.state.contentDetails.amount} contentId = {this.state.contentDetails._id}/>
                                    <div className="detailshimg-overlay">
                                        <div>
                                            <ButtonComponent
                                                handleClick={() => { this.state.active === false ? this.addToFavourite(this.state.contentDetails._id) : this.removeToFavourites(this.state.contentDetails._id) }}
                                                buttontext={this.state.active === false ? 'Add Favourite' : 'Remove Favourite'}
                                                btniconclass="fa fa-heart"
                                                buttonextraclass="active-favoriteicn"
                                                buttonextraclass={(this.state.active === false ? "active-favoriteicn" : " ") + " " + "afterclick"}
                                            />
                                        </div>
                                        {this.state.contentDetails.premium ===true ?
                                            <div className="cardpremiumdivstart">
                                                <StarIcon className="cardpremiumstarcss" />
                                                <p className="cardpremiumtag">Premium</p>
                                            </div>
                                            :null}

                                       

                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <p className="showdescription">{this.state.contentDetails.description}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className="detailleftpart">
                                <h2 className="sectiondetailtitle">
                                    {this.state.contentDetails.title}
                                </h2>
                                <div className="nextlineaftertitle">
                                  
                                    <p className="showtiming">Duration : <span className="showtitlevalut">{this.state.contentDetails.duration}
                                    </span></p>
                                    <p className="releasedyear">ReleaseDate :<span className="showtitlevalut">{moment(this.state.contentDetails.releaseDate).format("Do MMMM YYYY")}</span></p>
                                </div>
                                <div className="detailtypediv">
                                    <div className="detailtypelabeldiv">
                                        <p className="showdifferentdetail">Genres :</p>
                                        <p className="showdifferentdetail">Director :</p>
                                    </div>
                                    <div className="detailtypevaluediv">
                                        {Array.isArray(this.state.contentDetails.genre) && this.state.contentDetails.genre.map(genername => {
                                            return (
                                                <p className="showdifferentdetail">
                                                    <span className="showtitlevalut">{genername}</span>
                                                </p>
                                            )
                                        })}
                                        {Array.isArray(this.state.contentDetails.director) && this.state.contentDetails.director.map(directorName => {
                                            return (
                                                <p className="showdifferentdetail">
                                                    <span className="showtitlevalut">{directorName}</span>
                                                </p>)
                                        })}
                                     
                                    </div>
                                </div>
                                <div className="showdetailbuttongroup">
                                    <ButtonComponent
                                        buttontext={this.state.activeWatch === true ? "Watch Later" : "Remove"}
                                        btniconclass={this.state.activeWatch === true ? "fa fa-clock-o" : "fa fa-minus-circle"}
                                        // 
                                        buttonextraclass="watchlaterbtn"
                                        handleClick={() => { this.state.activeWatch === true ? this.clickWatchLater(this.state.contentDetails._id) : this.removeWatchLater(this.state.contentDetails._id) }}
                                    />
                                </div>
                                <div className="moredetailsdiv">
                                    <p className="moredetailssection">More Details</p>
                                    <div className="detailtypediv moredetailsdiv">
                                        <div className="detailtypelabeldiv">

                                            <p className="showdifferentdetail"><span class="detailsSubHeading">Producers : </span> {Array.isArray(this.state.contentDetails.producer) && this.state.contentDetails.producer.map(producerName => {
                                                return (
                                                    <span className="showtitlevalut">{producerName}</span>
                                                )
                                            })}</p>
                                            <p className="showdifferentdetail"><span class="detailsSubHeading">Cast : </span>  {Array.isArray(this.state.contentDetails.cast) && this.state.contentDetails.cast.map(castName => {
                                                return (
                                                    <span className="showtitlevalut">{castName}</span>
                                                )
                                            })}</p>
                                            <p className="showdifferentdetail"><span class="detailsSubHeading">Writer : </span>  {Array.isArray(this.state.contentDetails.writer) && this.state.contentDetails.writer.map(writerName => {
                                                return (
                                                   <span className="showtitlevalut">{writerName}</span>
                                                )
                                            })}</p>
                                        </div>                                          
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                
                <div className="relatedshow-carousel">
                    <RelatedShowSection seriesData={this.state.contentDetails} viewClick={()=>this.viewAll(this.state.contentDetails.episodes)} />
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
    connect(mapStateToProps, mapDispatchToProps)(DetailSection)
);