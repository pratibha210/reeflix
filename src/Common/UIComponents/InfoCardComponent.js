// WatchingListCard
import React, { useState } from 'react';
import './uicomponent.css';
import { withRouter } from "react-router-dom";
import Card from '@material-ui/core/Card';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import DropdownForm from '../FormFields/DropdownFormField';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import FavoriteIcon from '@material-ui/icons/Favorite';

const InfoCardComponent = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const popoverMenuShow = event => {
        setAnchorEl(event.currentTarget);
    };

    const popoverMenuClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className={"infocard-start" + " " + props.extracls}>
            {props.remove &&
                <p className="removebtn" onClick={props.removeCalled}>
                    <RemoveCircleOutlineIcon className="removeicn" />
                    Remove</p>
            }
            {props.addmenu &&
                <div className="showmenu-dropdwnarea">
                    <AddIcon className="menudropdwn-icn" onClick={popoverMenuShow} />
                </div>
            }
            {props.premium &&
                <div className="cardpremiumdivstart">
                    <StarIcon className="cardpremiumstarcss" />
                    <p className="cardpremiumtag">Premium</p>
                </div>
            }
            <Card className="infocardcls"
                onClick={props.handleClick}
            >
                <div className="topimgarea">
                    <img src={props.imgsrc} className="infocardimg" alt="img04" />
                    <div className="playicnarea">
                        <img src={props.playicn} className="playbtn" alt="play" />
                    </div>
                </div>
                <div className="carddetailarea">
                    <p className="shownamecls">{props.showName}</p>

                </div>
            </Card>
            <div className="nextlineaftertitle">

                <p className="showtiming">Duration : {props.duration}</p>
                {props.menuarea &&
                    <div className="menuiconarea">
                        <div onClick={props.onFavClick} >
                            <Tooltip
                                title=" Add to Favourite"
                                placement="bottom"
                                className="seriesmenuicn">
                                    {props.favtitle ?
                                <FavoriteIcon className="activeiconcls" />
                                     :

                                 <FavoriteBorderIcon /> } 

                            </Tooltip>
                        </div>
                        <div onClick={props.onWatchClick}>
                            <Tooltip
                                title=" Watch Later"
                                placement="bottom"
                                className="seriesmenuicn">
                                    {props.watchtitle ?
                                <WatchLaterIcon />
                                    :
                               <WatchLaterOutlinedIcon /> }

                            </Tooltip>
                        </div>


                    </div>
                }
            </div>
            <DropdownForm
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleClose={popoverMenuClose}
                handleClick={popoverMenuShow}
                dropdownextracls="infocard-drpdwnmenu"
                dropdownanchercls="shomeseries-ancher"
                dropdownOptions={[
                    { label: 'Add to Favourite', value: 'favourite', facls: "fa fa-heart" },
                    { label: 'Watch Later', value: 'watchlater', facls: "fa fa-clock-o" }
                ]}
            />
        </div>
    );

}

export default withRouter(InfoCardComponent);
