import { combineReducers } from 'redux';


import {errorMessage} from '../redux/reducers/errorMessage';
import {categoriesList} from '../redux/reducers/categoriesList';
import {bannerList} from '../redux/reducers/bannerList';
import {catSectionList} from '../redux/reducers/catSectionList';
import {tempseriesData} from '../redux/reducers/tempseriesData';
import {tempSectionDetails} from '../redux/reducers/tempSectionDetails';
import {favouriteList} from '../redux/reducers/favouriteList';
import {watchList} from '../redux/reducers/watchList';
import {favouritelistdata} from '../redux/reducers/favouritelistdata';
import {watchlaterlistdata} from '../redux/reducers/watchlaterlistdata';
import {tempEpisodeData} from '../redux/reducers/tempEpisodeData';

import {tempsearchData} from '../redux/reducers/tempsearchData';
import {userDetails} from '../redux/reducers/userDetails';


const RootReducer = combineReducers({
    errorMessage,
    categoriesList,
    bannerList,
    catSectionList,
    tempseriesData,
    tempSectionDetails,
    favouriteList,
    watchList,
    favouritelistdata,
    watchlaterlistdata,
    tempEpisodeData,
    tempsearchData,
    userDetails

});

export default RootReducer;
