import React, { Component } from 'react';
import '../sections.css';
import Slider from "react-slick";
import next from '../../../Images/next.png';
import previous from '../../../Images/previous.png';
import play from '../../../Images/play.png';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actioncreators from "../../../redux/Action";
import { connect } from "react-redux";
import { __DEV } from '../../../isDev'
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="sectionnextarrowdiv"
            // style={{ ...style, }}
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

class RelatedShowSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            episodeData: []
        };
    }

    goToDetail = (contentId) => {

        __DEV && console.log(contentId);
        this.props.history.replace(`/home/details/${contentId}`);
    }

    componentDidMount(){

        if (this.props.seriesData) {
            __DEV && console.log(this.props.seriesData);

            //To set episodeData from seriesData send by detailsSection 
            this.setState({ episodeData: this.props.seriesData }, () => {

                __DEV && console.log(this.state.episodeData);

                const { id } = this.props.match.params
                __DEV && console.log(id);
        
                let contentId = id;

                if(this.state.episodeData.length > 0){

                  var array = this.state.episodeData.filter(episode =>{

                    __DEV && console.log(episode);

                    if(episode.content._id != contentId){

                        return episode;
                    }
                   });

                   this.setState({episodeData:array},()=>{

                    __DEV && console.log(this.state.episodeData);
                   });
                }



            })

        }


    }


    componentWillReceiveProps(newProps) {
        // __DEV && console.log(newProps)
        if (!Object.is(newProps.seriesData, this.props.seriesData)) {
            __DEV && console.log(newProps.seriesData)

            //To set episodeData from seriesData send by detailsSection 
            this.setState({ episodeData: newProps.seriesData.episodes }, () => {

                __DEV && console.log(this.state.episodeData);

                const { id } = newProps.match.params
                 __DEV && console.log(id);
        
                let contentId = id;

                if(this.state.episodeData.length > 0){

                    var array = this.state.episodeData.filter(episode =>{
  
                      __DEV && console.log(episode);
  
                      if(episode.content._id != contentId){
  
                          return episode;
                      }
                     });
  
                     this.setState({episodeData:array},()=>{
  
                      __DEV && console.log(this.state.episodeData);
                     });
                  }

               
            })

        }

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
            // <div></div>
            <div className="homeseries-sectionstart related-shows-div">
                  {this.props.seriesData.type =="series" || this.props.seriesData.type == "episode"?
                <div className="inerseries-sec">
                  
                    <h2 className="homesec-heading">
                        <span className="sectiontitle">You May Also Like</span>
                        <span className="viewallbtn" onClick={this.props.viewClick}>View All</span>
                    </h2>
                   
                    <hr className="lightborder" />
                    <Slider {...settings}>
                        {this.state.episodeData.length > 0 && this.state.episodeData.map(data => {
                            return (

                                <div>
                                    <div className="firstslider sectionslidercard" onClick={()=>this.goToDetail(data.content._id)}>
                                        <div className="topimgdiv">
                                            <img src={Object.keys(data.content).length > 0 && process.env.REACT_APP_apiurl+"/file/getResizedImage?width=300&height=394&key="+data.content.thumbnail1+"&fit=fill"} className="sectioncardimage" alt="img04" />
                                            <div className="showsplaydiv">
                                                <img src={play} className="playbtn" alt="play" />
                                            </div>
                                        </div>
                                        <div className="sectioncardname">
                                            <p className="showname">{Object.keys(data.content).length > 0 && data.content.title}</p>
                                            <p className="showdescrption">{Object.keys(data.content).length > 0 && data.content.description}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        })}
                    </Slider>
                </div>
                 :null}

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
    connect(mapStateToProps, mapDispatchToProps)(RelatedShowSection)
);