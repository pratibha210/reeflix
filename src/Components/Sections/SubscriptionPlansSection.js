// SubscriptionPlansSection
import React from 'react';
import './sections.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import DoneIcon from '@material-ui/icons/Done';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent'


const SubscriptionPlansSection = (props) => {

    return (
        <div className="subscriptionplansec-start">
            <div className="subscription-headerpart">
                <h2 className="homesec-heading">
                    <span className="sectiontitle">Choose a Plan</span>
                </h2>
            </div>
            <hr className="lightborder" />
            <div className="innerplanarea">
                <Grid container spacing={2}>
                    <Grid md={4} xs={12} sm={4}>
                        <Card className="singleplancard">
                            <CardContent className="plan-cardcontent">
                                <p className="plantitle">Basic Plan</p>
                                <p className="sinleplan-price">$10/
                                <span className="plantime">month</span>
                                </p>
                                <hr className="lightborder plancardborder" />
                                <div className="carddetail-area">
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Prime Video
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Ultra HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                </div>
                            </CardContent>
                            <CardActions className="plancard-action">
                                <ButtonComponent buttontext="Buy Now" buttonextraclass="planbutncls" />
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid md={4} xs={12} sm={4}>
                        <Card className="singleplancard">
                            <CardContent className="plan-cardcontent">
                                <p className="plantitle">Premium Plan</p>
                                <p className="sinleplan-price">$18/
                                <span className="plantime"> month</span>
                                </p>
                                <hr className="lightborder plancardborder" />
                                <div className="carddetail-area">
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Prime Video
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Ultra HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                </div>
                            </CardContent>
                            <CardActions className="plancard-action">
                                <ButtonComponent buttontext="Buy Now" buttonextraclass="planbutncls" />
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid md={4} xs={12} sm={4}>
                        <Card className="singleplancard">
                            <CardContent className="plan-cardcontent">
                                <p className="plantitle">VIP Plan</p>
                                <p className="sinleplan-price">$85/
                                <span className="plantime">year</span>
                                </p>
                                <hr className="lightborder plancardborder" />
                                <div className="carddetail-area">
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Prime Video
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Ultra HD Available
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                    <p className="cardfeatureslist"><DoneIcon className="cardavailabileicn" />
                                        Lorem Ipsum is simply dummy
                                    </p>
                                </div>
                            </CardContent>
                            <CardActions className="plancard-action">
                                <ButtonComponent buttontext="Buy Now" buttonextraclass="planbutncls" />
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

            </div>
        </div>
    );
}

export default SubscriptionPlansSection;