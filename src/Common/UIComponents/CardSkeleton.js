// CardSkeleton
import React, { useState } from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


const CardSkeleton = (props) => {

    return (
        <div className="infocard-skeleton">
            <Grid container spacing={2}>
                <Grid item md={3} xs={12}>
                    <Card className="cardskeletoncls">
                        <div className="cardupperpart">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="cardloweerpart">
                            <Skeleton width={'75%'} height={'20px'} />
                            <Skeleton width={'60%'} height={'20px'} />
                        </div>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className="cardskeletoncls">
                        <div className="cardupperpart">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="cardloweerpart">
                            <Skeleton width={'75%'} height={'20px'} />
                            <Skeleton width={'60%'} height={'20px'} />
                        </div>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className="cardskeletoncls">
                        <div className="cardupperpart">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="cardloweerpart">
                            <Skeleton width={'75%'} height={'20px'} />
                            <Skeleton width={'60%'} height={'20px'} />
                        </div>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className="cardskeletoncls">
                        <div className="cardupperpart">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="cardloweerpart">
                            <Skeleton width={'75%'} height={'20px'} />
                            <Skeleton width={'60%'} height={'20px'} />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );

}

export default CardSkeleton;
