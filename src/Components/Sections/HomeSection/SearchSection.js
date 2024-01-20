import React, { Component } from 'react';
import '../sections.css';
import play from '../../../Images/play.png';
import Grid from '@material-ui/core/Grid';
import InfoCardComponent from '../../../Common/UIComponents/InfoCardComponent';
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import NoDataFoundComponent from '../../../Common/UIComponents/NoDataFoundComponent';
import CardSkeleton from '../../../Common/UIComponents/CardSkeleton';
import { reeflix_App_key } from "../../../constant";
import { __DEV } from "../../../isDev";

class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionArray: [],
            activefav: false,
            userId: JSON.parse(localStorage.getItem("userDetails")),
        }

    }

    goToDetail = (contentId) => {
        this.props.history.push(`/home/details/${contentId}`)
    }

    componentDidMount() {
        if (this.props.tempsearchData && this.props.tempsearchData.length>0) {
            this.setState({ sectionArray: this.props.tempsearchData }, () => {
                 __DEV && console.log(this.state.sectionArray);

            })

        }
       
    }

   
    componentWillReceiveProps(newProps) {
        /////////////to receive categories list  from reducer////////////
         __DEV && console.log(newProps.tempsearchData)
        if (!Object.is(newProps.tempsearchData, this.props.tempsearchData)) {
            this.setState({ sectionArray: newProps.tempsearchData }, () => {
                 __DEV && console.log(this.state.sectionArray);
            })
        }
    }


    render() {
        return (
            <div className="homeseries-sectionstart viewall-section">
                {this.state.sectionArray.length > 0 ? 
                   
                        <div className="inerseries-sec">
                            {/* {this.props.label === true ?
                                null :

                                <div>
                                    <h2 className="homesec-heading">
                                        <span className="sectiontitle">{"name"}</span>
                                        <span className="resultdiv">{"data.content.length"}</span>
                                    </h2>
                                    <hr className="lightborder" />
                                </div>
                            } */}

                            {/* Card Skeleton start */}
                            {/* <CardSkeleton /> */}
                            {/* Card Skeleton end */}
                            <div className="viewallcard-area">
                                <Grid container spacing={2}>
                                    {this.state.sectionArray.length > 0 && this.state.sectionArray.map(list => {
                                        return (
                                            <Grid item md={3} xs={12} sm={4}>
                                                <div>
                                                    <InfoCardComponent playicn={play} 
                                                    imgsrc={process.env.REACT_APP_apiurl+"/file/getResizedImage?width=300&height=394&key="+list.thumbnail1+"&fit=fill"}
                                                        showName={list.title} showDes={list.description}
                                                        remove={this.props.remove}
                                                        handleClick={() => this.goToDetail(list._id)}
                                                        premium={list.premium==true? true:false}/>

                                                </div>
                                            </Grid>
                                        )
                                    })}
                                   

                              
                                   </Grid>
                            </div>
                        </div>
                    
                : (<NoDataFoundComponent nodatatext="No Results found !!!" />)}
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
    connect(mapStateToProps, mapDispatchToProps)(SearchSection)
);