import React, { Component } from 'react';
import '../sections.css';
import play from '../../../Images/play.png';
import Grid from '@material-ui/core/Grid';
import InfoCardComponent from '../../../Common/UIComponents/InfoCardComponent';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import NoDataFoundComponent from '../../../Common/UIComponents/NoDataFoundComponent';
import CardSkeleton from '../../../Common/UIComponents/CardSkeleton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { reeflix_App_key } from "../../../constant";
import { __DEV } from "../../../isDev";

class ViewallSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionArray: [],
            activefav: false,
            loading: false,
            // activeWatch: false,
            favlistId: [],
            userId: JSON.parse(localStorage.getItem("userDetails")),
            watchlistId: []
        }

    }

    goToDetail = (contentId) => {
        // this.props.actions.sectionDetails(contentId);
        this.props.history.push(`/home/details/${contentId}`)
    }

    componentDidMount() {

        /**checking condition for set state sectionArray
                * @tempseriesData : reducers for seriesData */
        __DEV && console.log(this.props.tempseriesData);

        __DEV && console.log(this.props.tempEpisodeData);


        if (Object.keys(this.props.tempseriesData).length > 0 && !this.props.falg && !this.props.watchFlag) {
            /** call get all categories api*/

            this.setState({ loading: true }, () => {
                __DEV && console.log(this.state.loading);
            })

            const reqValues = {
                method: "GET",

                headers: {
                    "key": reeflix_App_key,
                    "Content-Type": "application/json"
                }
            };
            __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

            fetch(process.env.REACT_APP_apiurl + "/categories/getByid?id=" + this.props.tempseriesData._id, reqValues)
                .then(result => result.json())
                .then(result => {


                    this.setState({ loading: false }, () => {
                        __DEV && console.log(this.state.loading);
                    })

                    __DEV && console.log(result);
                    if (!result.error) {

                        __DEV && console.log(result.result);

                        this.props.actions.getOneCategories(result.result);
                    }

                    else {
                        let data = {
                            error: result.error,
                            time: Date.now(),
                            message: result.message
                        }


                    }

                })
                .catch(err => {
                    this.setState({ loading: false }, () => {
                        __DEV && console.log(this.state.loading);
                    })
                    __DEV && console.log(err);

                });


        }

        /** @param flag : passing from favouritescreen*/

        if (this.props.falg) {

            /**@favouritelistdata : favouritelist reducers */

            if (this.props.favouritelistdata && this.props.favouritelistdata.length > 0) {

                this.setState({ sectionArray: this.props.favouritelistdata }, () => {
                    __DEV && console.log(this.state.sectionArray);
                })

            }
        }

        //  {
        /**@atchlaterlistdata : watchlater reducers */

        else if (this.props.watchFlag) {


            // (this.props.watchlaterlistdata && this.props.watchlaterlistdata.length > 0) {
            this.setState({ sectionArray: this.props.watchlaterlistdata }, () => {
                __DEV && console.log(this.state.sectionArray);
            })

        }
        // }

        else {
            if (this.props.tempEpisodeData && this.props.tempEpisodeData) {
                this.setState({ sectionArray: this.props.tempEpisodeData }, () => {
                    __DEV && console.log(this.state.sectionArray);
                })

            }
        }

    }


    componentWillReceiveProps(newProps) {
        /////////////to receive categories list  from reducer////////////
        __DEV && console.log(newProps.catSectionList)

        if (!Object.is(newProps.catSectionList, this.props.catSectionList)) {
            this.setState({ sectionArray: newProps.catSectionList }, () => {
                __DEV && console.log(this.state.sectionArray);
            })

            this.setState({ favlistId: newProps.favouriteList }, () => {
                console.log(this.state.favlistId);
            })

            this.setState({ watchlistId: newProps.watchList }, () => {
                console.log(this.state.watchlistId);
            })

        }
        if (newProps.favouriteList, this.props.favouriteList) {
            this.setState({ favlistId: newProps.favouriteList }, () => {
                console.log(this.state.favlistId);
            })

        }
        if (newProps.watchList, this.props.watchList) {
            this.setState({ watchlistId: newProps.watchList, activeWatch: true }, () => {
                console.log(this.state.watchlistId);
            })
        }

        else if (!Object.is(newProps.favouritelistdata, this.props.favouritelistdata)) {
            this.setState({ sectionArray: newProps.favouritelistdata }, () => {
                __DEV && console.log(this.state.sectionArray);
            })

        }

        else if (!Object.is(newProps.watchlaterlistdata, this.props.watchlaterlistdata)) {
            this.setState({ sectionArray: newProps.watchlaterlistdata, activeWatch: true }, () => {
                __DEV && console.log(this.state.sectionArray);
            })
        }
        else {
            if (newProps.tempEpisodeData && this.props.tempEpisodeData) {
                this.setState({ sectionArray: newProps.tempEpisodeData }, () => {
                    __DEV && console.log(this.state.sectionArray);
                })

            }
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

                __DEV && console.log(result.result);
                if (!result.error) {
                    var Arr = result.result.contents;
                    var data = [];
                    for (let i = 0; i < Arr.length; i++) {
                        data.push(Arr[i].id);
                    }
                    console.log(data);
                    this.props.actions.addfavAction(data)
                    // this.setState({ favlistId: data }, () => {
                    //     console.log(this.state.favlistId);
                    // })

                    this.setState({ activefav: true });
                    this.setState({ sectionArray: this.props.catSectionList }, () => {
                        __DEV && console.log(this.state.sectionArray);
                    })

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


    /** both remove functions are calling from this function ////
     * @removeToFavourites 
     *  @removeWatchLater
     */
    ///// remove onclick function/////
    onRemoveClick = (contentId) => {
        __DEV && console.log();

        if (this.props.falg) {
            this.removeToFavourites(contentId, 'flag')
        }
        else {
            if (this.props.watchFlag) {
                this.removeWatchLater(contentId, 'watch')
            }
        }
    }

    /**remove content from favourite list  function
         * @param contentId : contentId is a card id which one you want to remove from Favourites list
         * @requestValues : in which we define method "Post", send headers and body:-logedin userid,contentid
         * @fetch : API fetch
         * @message : set state for message
        */
    removeToFavourites = (contentId, flag) => {
        this.setState({ activefav: true });
        /// call remove favourites api //////
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

        fetch(process.env.REACT_APP_apiurl + "/favourite/remove", reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    if (flag) {
                        var arr = [...this.props.favouritelistdata];

                        var data = [];
                        var content = null;
                        for (let i = 0; i < arr.length; i++) {
                            data = (arr[i].content);
                        }
                        var index = data.findIndex(x => x._id === contentId);
                        data.splice(index, 1);

                        for (let i = 0; i < data.length; i++) {
                            content = data[i];
                            
                        }
                        arr.push(content[0]);
                        delete arr[1];

                        this.props.actions.removefavAction(arr, flag);
                        this.setState({ sectionArray: arr }, () => {
                            __DEV && console.log(this.state.sectionArray);
                        })
                    }
                    else {
                        var arr = [...this.state.favlistId];
                        var index = arr.findIndex(x => x === contentId);
                        arr.splice(index, 1);

                        this.props.actions.removefavAction(arr);
                        this.setState({ sectionArray: this.props.catSectionList }, () => {
                            __DEV && console.log(this.state.sectionArray);
                        })

                    }

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

                    var Arr = result.result.contents;
                    var data = [];
                    for (let i = 0; i < Arr.length; i++) {
                        data.push(Arr[i].id);
                    }
                    // console.log(data);

                    this.props.actions.addwatchLaterAction(data)
                    this.setState({ watchlistId: data }, () => {
                        console.log(this.state.watchlistId);
                    })
                    this.setState({ activewatch: true })
                    this.setState({ sectionArray: this.props.catSectionList }, () => {
                        __DEV && console.log(this.state.sectionArray);
                    })

                    this.setState({ watchlistId: this.props.watchList }, () => {
                        console.log(this.state.watchlistId);
                    })


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
         * @fetch : API  url fetch 
         * @message : set state for message
        */
    removeWatchLater = (contentId, watch) => {
        __DEV && console.log(contentId);
        this.setState({ activeWatch: true });
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
        __DEV && console.log(reqValues.body);

        fetch(process.env.REACT_APP_apiurl + "/watchlist/remove", reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    this.setState({ activeWatch: true });
                    // __DEV && console.log(result.result);

                    if (watch) {
                        var arr = [...this.props.watchlaterlistdata];
                        var data = [];
                        var content = null;

                        for (let i = 0; i < arr.length; i++) {
                            data = (arr[i].content);
                        }
                        var index = data.findIndex(x => x._id === contentId);
                        data.splice(index, 1);

                        for (let i = 0; i < data.length; i++) {
                            content = data[i]
                        }

                        arr.push(content[0]);
                        delete arr[1];

                        this.props.actions.removewatchLaterAction(arr, watch)

                        this.setState({ sectionArray: arr }, () => {
                            // __DEV && console.log(this.state.sectionArray);
                        })
                    }
                    else {
                        var arr = [...this.state.watchlistId];
                        var index = arr.findIndex(x => x === contentId);
                        arr.splice(index, 1);

                        this.props.actions.removewatchLaterAction(arr)
                        this.setState({ sectionArray: this.props.catSectionList }, () => {
                            // __DEV && console.log(this.state.sectionArray);
                        })

                    }

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
            <div className="homeseries-sectionstart viewall-section">
                {this.state.loading === true ?

                    <CardSkeleton />
                    :
                    this.state.sectionArray.length > 0 ?

                        this.state.sectionArray.map(data => {
                            return (
                                <div className="inerseries-sec">
                                    {this.props.label === true ?
                                        null :

                                        <div>
                                            <h2 className="homesec-heading">
                                                <span className="sectiontitle">{data.name}</span>
                                                <span className="resultdiv">{data.content.length}</span>
                                            </h2>
                                            <hr className="lightborder" />
                                        </div>
                                    }

                                    <div className="viewallcard-area">
                                        <Grid container spacing={2}>
                                            {data && data.content.map(list => {
                                                return (
                                                    <Grid item md={3} xs={12} sm={4}>
                                                        <div>
                                                            <InfoCardComponent playicn={play} imgsrc={process.env.REACT_APP_apiurl + "/file/getResizedImage?width=300&height=185&key=" + list.thumbnail2 + "&fit=cover"}
                                                                showName={list.title} showDes={list.description}
                                                                remove={this.props.remove}
                                                                handleClick={() => this.goToDetail(list._id)}
                                                                // removeCalled={() => list._id ? this.removeToFavourites(list._id) : this.addToFavouriteList(list._id)}
                                                                removeCalled={() => this.onRemoveClick(list._id)}
                                                                premium={list.premium == true ? true : false}
                                                                extracls='infocardforviewall'
                                                                onWatchClick={() => { this.state.watchlistId.includes(list._id) ? this.removeWatchLater(list._id) : this.onClickWatchLater(list._id) }}
                                                                onFavClick={() => this.state.favlistId.includes(list._id) ? this.removeToFavourites(list._id) : this.addToFavouriteList(list._id)}
                                                                menuarea={!this.props.falg && !this.props.watchFlag}
                                                                watchtitle={this.state.watchlistId && this.state.watchlistId.length > 0 && this.state.watchlistId.includes(list._id)}
                                                                favtitle={this.state.favlistId && this.state.favlistId.includes(list._id)}

                                                                duration={list.duration} />

                                                        </div>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </div>
                                </div>
                            )
                        }) :

                        (<NoDataFoundComponent nodatatext="No Results found !!!" />)}
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
    connect(mapStateToProps, mapDispatchToProps)(ViewallSection)
);