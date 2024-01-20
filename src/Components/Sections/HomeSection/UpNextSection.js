import React, { Component } from 'react';
import '../sections.css';
import Slider from "react-slick";
import img04 from '../../../Images/img04.jpg'
import img05 from '../../../Images/img05.jpg'
import img06 from '../../../Images/img06.jpg'
import img07 from '../../../Images/img06.jpg'
import img08 from '../../../Images/img08.jpg'
import next from '../../../Images/next.png';
import previous from '../../../Images/previous.png';
import play from '../../../Images/play.png';
import { withRouter } from "react-router-dom";


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
    viewAll = () => {
        this.props.history.push('/home/viewall')
    }
    goToDetail = () => {
        this.props.history.push('/home/play')
    }
    render() {
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
                }
            ]
        };

        return (
            <div className="homeseries-sectionstart">
                <div className="inerseries-sec">
                    <h2 className="homesec-heading">
                        <span className="sectiontitle">Up Next</span>
                        <span className="viewallbtn" onClick={this.viewAll}>View All</span>
                    </h2>
                    <hr className="lightborder" />
                    <Slider {...settings}>
                        <div>
                            <div className="firstslider sectionslidercard" onClick={this.goToDetail}>
                                <div className="topimgdiv">
                                    <img src={img04} className="sectioncardimage" alt="img04" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img05} className="sectioncardimage" alt="img05" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img06} className="sectioncardimage" alt="img06" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img07} className="sectioncardimage" alt="img07" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img08} className="sectioncardimage" alt="img08" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img05} className="sectioncardimage" alt="img05" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img06} className="sectioncardimage" alt="img06" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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
                                    <img src={img04} className="sectioncardimage" alt="img04" />
                                    <div className="showsplaydiv">
                                        <img src={play} className="playbtn" alt="play" />
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

export default withRouter(HomeSeriesSection);
