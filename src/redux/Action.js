/* import reflex app key*/

import { reeflix_App_key } from "../constant";
import { __DEV } from "../isDev";

//Global reducer for error message
export function errorMessage(data) {
  return {
    type: "error_message",
    data: data
  };
}




/**get all categories by userId
 * @param userId : loggedin user _id
 * @method : "GET"
 * @reducers : bannerList,categoriesList,favouriteList,watchList,errorMessage
 */

export function getAllCategoires(userId) {
  __DEV && console.log(userId);
  return dispatch => {
    //authentication function
    const reqValues = {
      method: "GET",

      headers: {
        "key": reeflix_App_key,
        "Content-Type": "application/json"
      }
    };
    __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

    fetch(process.env.REACT_APP_apiurl + "/categories/getAll?userId=" + userId, reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);
        if (!result.error) {

          __DEV && console.log(result.result);
          dispatch(bannerList(result.recent))
          dispatch(categoriesList(result.result))
          dispatch(favouriteList(result.favourites))
          dispatch(watchList(result.wtchlist))
        }

        else {
          let data = {
            error: "true",
            time: Date.now(),
            message: "no data found"
          }

          dispatch(errorMessage(data))
        }

      })
      .catch(err => {
        __DEV && console.log(err);
        let data = {
          error: err,
          time: Date.now(),
          message: "error found"
        }
        dispatch(errorMessage(data))
      });
  }
}

////// add favourite list///
export function addfavAction(data) {
  __DEV && console.log(data);
  return (dispatch, getState) => {

    dispatch(favouriteList(data));
    ;

  }
}

////// remove favourite list///
export function removefavAction(data, flag) {
  __DEV && console.log(data, flag);
  return (dispatch, getState) => {
    if (flag) {
      dispatch(favouriteListdata(data))
    }
    else {
      dispatch(favouriteList(data));
    }
  }
}



/////add watch later list /////
export function addwatchLaterAction(data) {
  __DEV && console.log(data);
  return dispatch => {

    dispatch(watchList(data))
  }
}

////remove watch later list /////
export function removewatchLaterAction(data, watch) {
  __DEV && console.log(data, watch);
  return dispatch => {
    if (watch) {
      dispatch(watchlaterlistdata(data))
    }
    else {
      dispatch(watchList(data))
    }
  }
}

///// categories reducers function ///
function watchlaterlistdata(data) {
  __DEV && console.log(data);
  return {
    type: "ALL_WATCHLATER_LIST",
    data: data
  };
}


///// categories reducers function ///
function categoriesList(data) {
  __DEV && console.log(data);
  return {
    type: "ALL_CATEGORIES",
    data: data
  };
}

///// recent banners reducers function ///
function bannerList(data) {
  __DEV && console.log(data);
  return {
    type: "ALL_BANNERS",
    data: data
  };
}


///// one section list reducers function ///
function catSectionList(data) {
  __DEV && console.log(data);
  return {
    type: "ONE_SECTIONLIST",
    data: data
  };
}


/////// section data /////

export function seriesData(data) {
  __DEV && console.log(data);
  return dispatch => {

    dispatch(tempseriesData(data));
  }
}

/////// episode list from series /////
export function seriesEpisode(data) {
  __DEV && console.log(data);
  return dispatch => {

    var epData = data.map(episode => {

      return episode.content;


    });

    let arr = [];

    let epObj = { content: epData };

    arr.push(epObj)

    dispatch(tempEpisodeData(arr));
  }
}

function tempEpisodeData(data) {
  __DEV && console.log(data);
  return {
    type: "EPISODE_DATA",
    data: data
  };
}
///// one series list reducers function ///
function tempseriesData(data) {
  __DEV && console.log(data);
  return {
    type: "SERIES_DATA",
    data: data
  };
}

////// get categories series by series id /////

export function getOneCategories(result) {
  __DEV && console.log(result);
  return dispatch => {

    dispatch(catSectionList(result))

  }
}



/////// section details /////

export function sectionDetails(data) {

  __DEV && console.log(data);
  return dispatch => {
    dispatch(tempSectionDetails(data));
  }
}

/////one content details reducers function ///
function tempSectionDetails(data) {
  __DEV && console.log(data);
  return {
    type: "SECTION_DETAILS",
    data: data
  };
}


/*get all favourite list by userId */

export function getAllfavouriteList(userId) {
  __DEV && console.log(userId);
  return dispatch => {
    //authentication function
    const reqValues = {
      method: "GET",

      headers: {
        "key": reeflix_App_key,
        "Content-Type": "application/json"
      }
    };
    __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

    fetch(process.env.REACT_APP_apiurl + "/favourite/w/get?userId=" + userId, reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);
        if (!result.error) {

          __DEV && console.log(result.result);
          let favouriterArr = [];
          favouriterArr.push(result.result)
          dispatch(favouriteListdata(favouriterArr))

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
        __DEV && console.log(err);

      });
  }
}

export function getAllWatchLaterList(userId) {
  __DEV && console.log(userId);
  return dispatch => {
    //authentication function
    const reqValues = {
      method: "GET",

      headers: {
        "key": reeflix_App_key,
        "Content-Type": "application/json"
      }
    };
    __DEV && console.log(reqValues, process.env.REACT_APP_apiurl);

    fetch(process.env.REACT_APP_apiurl + "/watchlist/w/get?userId=" + userId, reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);
        if (!result.error) {

          __DEV && console.log(result.result);
          let watchLaterArr = [];
          watchLaterArr.push(result.result)
          dispatch(watchListdata(watchLaterArr))

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
        __DEV && console.log(err);

      });
  }
}

function favouriteListdata(data) {

  __DEV && console.log(data);
  return {
    type: "ALL_FAVOURITE_LIST",
    data: data
  };


}

function watchListdata(data) {

  __DEV && console.log(data);
  return {
    type: "ALL_WATCHLATER_LIST",
    data: data
  };


}



/////one favourite List reducers function ///
function favouriteList(data) {
  __DEV && console.log(data);
  return {
    type: "ALL_FAVOURITE",
    data: data
  };
}


///// watch List reducers function ///
function watchList(data) {
  __DEV && console.log(data);
  return {
    type: "WATCH_LIST",
    data: data
  };
}


/////// Search details /////

export function searchContentList(data) {

  __DEV && console.log(data);
  return dispatch => {
    dispatch(tempsearchData(data));
  }
}


///// watch List reducers function ///
function tempsearchData(data) {
  __DEV && console.log(data);
  return {
    type: "SEARCH_LIST",
    data: data
  };
}

function userDetails(data) {
  return {
    type: 'LOGGED_USER_DETAILS',
    data: data
  };
}

export function getUserData(data) {
  return dispatch => {
    dispatch(userDetails(data));
  }
}

export function getuserByUserId(userId) {
  __DEV && console.log(userId);
  return dispatch => {
    const reqValues = {
      method: "GET",
      headers: {
        "key": reeflix_App_key,
        "Content-Type": "application/json"
      }
    };
    fetch(process.env.REACT_APP_apiurl + "/user/getById?id=" + userId, reqValues)
      .then(result => result.json())
      .then(result => {
        __DEV && console.log(result);
        if (!result.error) {
          dispatch(userDetails(result.result))
        }
        else {
          console.log('error during get user by id')
        }

      })
      .catch(err => {
        __DEV && console.log(err);

      });
  }
}