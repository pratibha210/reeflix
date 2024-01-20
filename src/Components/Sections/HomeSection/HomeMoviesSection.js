import React, { Component } from 'react';
import '../sections.css';
import Slider from "react-slick";
import loginback from '../../../Images/loginback.jpg'
import img04 from '../../../Images/img04.jpg'
import img05 from '../../../Images/img05.jpg'
import img06 from '../../../Images/img06.jpg'
import img07 from '../../../Images/img06.jpg'
import img08 from '../../../Images/img08.jpg'
import next from '../../../Images/next.png';
import previous from '../../../Images/previous.png';
import play from '../../../Images/play.png';
import { withRouter} from "react-router-dom";
import { __DEV } from '../../../isDev';
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="sectionnextarrowdiv"
            onClick={onClick}
        >
            <div className="nextarrowalignment">
                <img className="arrowcls" src={next} />
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
                <img className="arrowcls" src={previous} />
            </div>
        </div>
    );
}
class HomeMoviesSection extends Component {
    goToDetail = () =>{
        __DEV && console.log(window.innerWidth,window.innerHeight)
        this.props.history.push('/home/details')
    }
    render() {
        const settings = {
            dots: true,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };

        return (
            <div className="homeseries-sectionstart">
                <div className="inerseries-sec">
                    <h2 className="homesec-heading">
                        <span className="sectiontitle">Movies</span>
                        <span className="viewallbtn">View All</span>
                    </h2>
                    <hr className="lightborder" />
                    <Slider {...settings}>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img04} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img05} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img06} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img07} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img08} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img05} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img06} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img04} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img05} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img06} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img07} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img08} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img04} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img05} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img06} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img07} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img08} className="sectioncardimage" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" />
                                    </div>
                                </div>
                                <div className="sectioncardname">
                                    <p className="showname">Show Name</p>
                                    <p className="showdescrption">Show description</p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default withRouter (HomeMoviesSection);
