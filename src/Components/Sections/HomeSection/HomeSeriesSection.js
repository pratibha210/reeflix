import React, { Component } from 'react';
import '../sections.css';
import Slider from "react-slick";
import next from '../../../Images/next.png';
import previous from '../../../Images/previous.png';
import play from '../../../Images/play.png';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import {withRouter } from "react-router-dom";
import DropdownForm from '../../../Common/FormFields/DropdownFormField';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { reeflix_App_key } from "../../../constant";
import StarIcon from '@material-ui/icons/Star';
import { __DEV } from "../../../isDev";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="sectionnextarrowdiv"
            onClick={onClick}
        >
            <div className="nextarrowalignment">
                <img className="arrowcls" src={next} alt="next" />
            </div>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="sectionpreviousarrowdiv"
            onClick={onClick}
        >
            <div className="prevarrowalignment">
                <img className="arrowcls" src={previous} alt="previous" />
            </div>
        </div>
    );
}
class HomeSeriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            anchorEl: null,
            favourite: false,
            watchlater: false,
            activefav: false,
            activewatch: false,
            userId: JSON.parse(localStorage.getItem("userDetails")),
            favListArray: [],
            watchListArray: []
        }

    }

    /**add to favourite  list
     * @param contentId : contentId is a card id which one you want to add in favourite list
     * @requestValues : in which we define method "Post", send headers and body:-logedin userid,contentid
     * @fetch : API fetch
     * @addfavAction : dispatch result into favouriteList reducers via this action function call
     * @message : set state for message
     * @activefav : state for active true add icon after successfully added
    */
    addToFavouriteList = (contentId) => {

        /// call add favourites api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": reeflix_App_key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                "userId": this.state.userId._id,
                "contentId": contentId
            })
        };


         __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

        fetch(process.env.REACT_APP_apiurl + "/favourite/add", reqValues)
            .then(result => result.json())
            .then(result => {

                 __DEV && console.log(result);
                if (!result.error) {
                    var Arr =result.result.contents;
                    var data= [];
                    for (let i = 0; i < Arr.length; i++) {
                        data.push(Arr[i].id);
                    }
                    console.log(data);
                    this.props.actions.addfavAction(data)
                    this.setState({ favListArray: data}, () => {
                        __DEV && console.log(this.state.favListArray, "favarray");
                       // this.setState({ activefav: true });
                   })
                    this.setState({ activefav: true });

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
    /** to remove an element from favourite 
         * @param contentId : contentId is a card id which one you want to remove in favourite list
         * @requestValues : in which we define method "Post", send headers and body:-logedin userid,contentid
         * @fetch : API fetch
         * @message : set state for message
         * @activefav : state for active false add icon after successfully removed
        */
    removeToFavourites = (contentId) => {

        /// call remove favourites api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": reeflix_App_key,
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
                    var arr = [...this.state.favListArray];
                    var index = arr.findIndex(x => x === contentId);
                    arr.splice(index, 1);
                   
                    this.props.actions.removefavAction(arr);
                    this.setState({ favListArray: arr }, () => {
                        __DEV && console.log(this.state.favListArray, "favarray");
                      
                   })
                    this.setState({ activefav: false });

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

    /** add to watch later function
         * @param contentId : contentId is a card id which one you want to add in watch later list
         * @requestValues : in which we define method "Post", send headers and body:-logedin userid,contentid
         * @fetch : API fetch
         * @addwatchLaterAction : dispatch result into watchlist reducers via this action function call
         * @message : set state for message
         * @activewatch : state for active true add icon after successfully added
        */
    onClickWatchLater = (contentId) => {

        /// call add watch later api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": reeflix_App_key,
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

                    var Arr =result.result.contents;
                    var data= [];
                    for (let i = 0; i < Arr.length; i++) {
                        data.push(Arr[i].id);
                    }
                    console.log(data);
                   
                    this.props.actions.addwatchLaterAction(data)
                    this.setState({ watchListArray: data }, () => {
                        __DEV && console.log(this.state.watchListArray);
                       // this.setState({ activefav: true });
                   })
                    this.setState({ activewatch: true })

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

    /**remove watch later function
         * @param contentId : contentId is a card id which one you want to remove from watch later list
         * @requestValues : in which we define method "Post", send headers and body:-logedin userid,contentid
         * @fetch : API fetch
         * @message : set state for message
         * @activewatch : state for active false add icon after successfully removed
        */
    removeWatchLater = (contentId) => {

        /// call remove watch later api //////
        const reqValues = {
            method: "POST",

            headers: {
                "key": reeflix_App_key,
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

                    var arr = [...this.state.watchListArray];
                    var index = arr.findIndex(x => x === contentId);
                    arr.splice(index, 1);
                   
                    this.props.actions.removewatchLaterAction(arr)
                    this.setState({ watchListArray: arr }, () => {
                        __DEV && console.log(this.state.watchListArray);
                       // this.setState({ activefav: true });
                   })
                     __DEV && console.log(result.result);
                    this.setState({ activewatch: false });

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
    // card dropdown start
    menuClicked = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("userDetails"));
         __DEV && console.log(userId._id);
        this.props.actions.getAllCategoires(userId._id);
         __DEV && console.log(this.props.favouriteList, this.props.watchList);
        this.setState({ categoriesList: this.props.categoriesList }, () => {
             __DEV && console.log(this.state.categoriesList);
        })

        if (this.props.watchList) {
            this.setState({ watchListArray: this.props.watchList }, () => {
                 __DEV && console.log(this.state.watchListArray, "watcharray")

                //   this.setState({ activewatch: true });

            })
        }
        if (this.props.favouriteList) {
            this.setState({ favListArray: this.props.favouriteList }, () => {
                 __DEV && console.log(this.state.favListArray, "favarray");
                // this.setState({ activefav: true });
            })
        }
    }


    handleClose = (event) => {
        this.setState({ anchorEl: null })
    }
    // card dropdown end

    viewAll = (data) => {
         __DEV && console.log(data);
        this.props.actions.seriesData(data);
        this.props.history.push('/home/viewall')
    }
    goToDetail = (contentId) => {
        // this.props.actions.sectionDetails(contentId);
        this.props.history.push(`/home/details/${contentId}`)
    }


    componentWillReceiveProps(newProps) {
        /////////////to receive categories list  from reducer////////////
         __DEV && console.log(newProps.categoriesList)
        if (!Object.is(newProps.categoriesList, this.props.categoriesList)) {
            this.setState({ categoriesList: newProps.categoriesList }, () => {
                 __DEV && console.log(this.state.categoriesList);
            })
        }

        if (!Object.is(newProps.watchList, this.props.watchList)) {
            this.setState({ watchListArray: this.props.watchList }, () => {
                 __DEV && console.log(this.state.watchListArray, "watcharray")

                //   this.setState({ activewatch: true });

            })
        }
        if (!Object.is(newProps.favouriteList, this.props.favouriteList)) {
            this.setState({ favListArray: this.props.favouriteList }, () => {
                 __DEV && console.log(this.state.favListArray, "favarray");
                // this.setState({ activefav: true });
            })
        }
    }

    dropdownClicked = (e) => {
         __DEV && console.log(e)
        switch (e) {
            case "favourite":
                this.setState({ favourite: true })
                break;
            case "watchlater":
                this.setState({ watchlater: true })
                break;
            case "remove_watchlater":
                this.setState({ watchlater: false })
                break;
            case "remove_favourite":
                this.setState({ favourite: false })
                break;
        }
    }



    render() {
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const settings = {
            dots: true,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2.2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 2560,
                    settings: {
                        slidesToShow: 5.2,
                        slidesToScroll: 5
                    }
                }
            ]
        };

        return (
            <div className="homeseries-sectionstart">
                {this.state.categoriesList.length > 0 && this.state.categoriesList.map(data => {
                    return (
                        <div className="inerseries-sec">
                            <h2 className="homesec-heading">
                                <span className="sectiontitle">{data.name}</span>
                                <span className="viewallbtn" onClick={() => this.viewAll(data)}>View All</span>
                            </h2>
                            <hr className="lightborder" />
                            <Slider {...settings}>
                                {data && data.content.map(list => {
                                    return (
                                        <div className="homeseriessec-card">
                                            <div className="slider-singleitem">
                                                <div className="firstslider sectionslidercard" onClick={() => this.goToDetail(list._id)}>
                                                    <div className="topimgdiv">
                                                        <img src={process.env.REACT_APP_apiurl+"/file/getResizedImage?width=238&height=175&key="+list.thumbnail1+"&fit=cover"} className="sectioncardimage" alt="img04" />
                                                        <div className="showsplaydiv">
                                                            <img src={play} className="playbtn" alt="play" />
                                                        </div>
                                                    </div>
                                                    <div className="sectioncardname">
                                                        <p className="showname">{list.title}</p>
                                                    </div>
                                                </div>
                                                <div className="nextlineaftertitle">
                                                    <p className="showtiming">Duration : {list.duration}</p>
                                                    <div className="menuiconarea">
                                                        <div onClick={() => this.state.favListArray.includes(list._id) ? this.removeToFavourites(list._id) : this.addToFavouriteList(list._id)}>
                                                            <Tooltip
                                                                title={this.state.favListArray.includes(list._id) ? "Remove" : " Add to Favourite"}
                                                                placement="bottom"
                                                                className="seriesmenuicn">
                                                                {this.state.favListArray.includes(list._id) ?
                                                                    <FavoriteIcon className="activeiconcls" />
                                                                    :
                                                                    <FavoriteBorderIcon />
                                                                }
                                                            </Tooltip>
                                                        </div>
                                                        <div onClick={() => { this.state.watchListArray.includes(list._id) ? this.removeWatchLater(list._id) : this.onClickWatchLater(list._id) }}>
                                                            <Tooltip
                                                                title={this.state.watchListArray &&this.state.watchListArray.length>0 && this.state.watchListArray.includes(list._id) ? "Remove" : " Watch Later"}
                                                                placement="bottom"
                                                                className="seriesmenuicn">
                                                                {this.state.watchListArray &&this.state.watchListArray.length>0 && this.state.watchListArray.includes(list._id) ?
                                                                    <WatchLaterIcon />
                                                                    :
                                                                    <WatchLaterOutlinedIcon />
                                                                }
                                                            </Tooltip>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            {list.premium ==true ?
                                            <div className="premiumdivstart">
                                                <StarIcon className="premiumstarcss" />
                                                <p className="premiumtag">Premium</p>
                                            </div>
                                            :null}
                                        </div>
                                    )
                                })}
                            </Slider>
                            <DropdownForm
                                id={id}
                                open={open}
                                handleClick={this.dropdownClicked}
                                anchorEl={this.state.anchorEl}
                                handleClose={this.handleClose}
                                dropdownOptions={
                                    [
                                        {
                                            label: (this.state.favourite === true ? "Remove" : "Add to Favourite"),
                                            value: (this.state.favourite === true ? "remove_favourite" : "favourite"),
                                            facls: (this.state.favourite === true ? "fa fa-heart" + " " + "activecolor" : "fa fa-heart-o"),
                                        },
                                        {
                                            label: (this.state.watchlater === true ? "Remove" : "Watch Later"),
                                            value: (this.state.watchlater === true ? "remove_watchlater" : "watchlater"),
                                            facls: (this.state.watchlater === true ? "fa fa-minus-circle" + " " + "activecolor" : "fa fa-clock-o"),
                                        },
                                    ]
                                }
                                dropdownextracls="dropdown-seriesmenu"
                                dropdownanchercls="shomeseries-ancher"
                            />

                        </div>
                    )
                })}
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
    connect(mapStateToProps, mapDispatchToProps)(HomeSeriesSection)
);