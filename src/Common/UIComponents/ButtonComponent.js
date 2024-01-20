import React from 'react';
import './uicomponent.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const ButtonComponent = (props) => {



        return (
            <div className={"buttoncomponent-start" + " " + props.buttonmainclass}>
                <Button className={"buttonclass" + " " + props.buttonextraclass}
                    onClick={props.handleClick}
                    disabled={props.disabled}
                >
                    {props.loading === true ?
                        null :
                        (props.btnimg &&
                            <img src={props.btnimg} className={"buttonimage" + " " + props.buttonimgextracls} alt="btnimg"/>
                        )}
                    {props.loading === true ?
                        null :
                        (props.btniconclass &&

                            <i className={props.btniconclass} aria-hidden="true"></i>
                        )
                    }
                    {props.loading === true ?
                        <CircularProgress size={15} className="buttonprogressdesign" /> :
                        props.buttontext
                    }
                </Button>
            </div>
        );

}

export default ButtonComponent;
