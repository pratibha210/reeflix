// NoDataFoundComponent
import React from 'react';
import './uicomponent.css';
import { withRouter } from "react-router-dom";
import nodata from '../../Images/nodata.png'



const NoDataFoundComponent = (props) => {

    return (
        <div className={"nodatafound-component" + " " + props.extracls}>
            <div className="inner-nodatafound">
                <div className="nodata-imgarea">
                    <img src={nodata} className="novideoimg" alt="nodata" />
                </div>
                <p className="nodata-txt">{props.nodatatext}</p>
            </div>
        </div>
    );

}

export default withRouter(NoDataFoundComponent);
