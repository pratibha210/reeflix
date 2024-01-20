// import React from 'react';
import './sections.css';
import img04 from '../../Images/img04.jpg'
import img05 from '../../Images/img05.jpg'
import img06 from '../../Images/img06.jpg'
import img07 from '../../Images/img07.jpg'
import img08 from '../../Images/img08.jpg'
import play from '../../Images/play.png';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import InfoCardComponent from '../../Common/UIComponents/InfoCardComponent';
import getAllfavouriteList from '../../redux/Action';
import {  useSelector, useDispatch } from "react-redux"
import React, {useEffect, Component,useState ,usePrevious} from 'react';


const FavouriteSection = () => {
    const [loginData, setLoginData] = useState({});
    const [userId,setUserId] = useState(JSON.parse(localStorage.getItem("userDetails")))
    // const [userId,setUserId] = useState(localStorage.getItem("userId"))

    const dispatch = useDispatch()

    const goToDetail = (props) => {
        props.history.push('/home/details')
    };



    return (
        <div className="homeseries-sectionstart favouritesec-start">

            <div className="inerseries-sec">
                <h2 className="homesec-heading">
                    <span className="sectiontitle">Series</span>
                    {/* <span className="resultdiv">23 results</span> */}
                </h2>
                <hr className="lightborder" />
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img04}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail}
                            />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img05}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail}
                            />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img06}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img08}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="inerseries-sec">
                <h2 className="homesec-heading">
                    <span className="sectiontitle">Movies</span>
                </h2>
                <hr className="lightborder" />
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img04}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img05}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img06}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <div>
                            <InfoCardComponent playicn={play} imgsrc={img07}
                                showName="Show Name" showDes="Show description"
                                handleClick={goToDetail} />
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    );

}

export default withRouter(FavouriteSection);
