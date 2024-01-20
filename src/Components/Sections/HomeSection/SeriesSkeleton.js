// SeriesSkeleton
import React from 'react';
import '../sections.css';
import Skeleton from '@material-ui/lab/Skeleton';


const SeriesSkeleton = (props) => {

    return (
        <div className="series-skeleton">
            <ul className="series-skeletonarea">
                <li className="series-skeletonitem">
                    <div className="series-upperpart">
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className="series-lowerpart">
                        <Skeleton width={'100%'} height={'20px'}/>
                        <Skeleton width={'65%'} height={'20px'}/>
                    </div>
                </li>
                <li className="series-skeletonitem">
                    <div className="series-upperpart">
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className="series-lowerpart">
                        <Skeleton width={'100%'} height={'20px'}/>
                        <Skeleton width={'65%'} height={'20px'}/>
                    </div>
                </li>
                <li className="series-skeletonitem">
                    <div className="series-upperpart">
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className="series-lowerpart">
                        <Skeleton width={'100%'} height={'20px'}/>
                        <Skeleton width={'65%'} height={'20px'}/>
                    </div>
                </li>
                <li className="series-skeletonitem">
                    <div className="series-upperpart">
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className="series-lowerpart">
                        <Skeleton width={'100%'} height={'20px'}/>
                        <Skeleton width={'65%'} height={'20px'}/>
                    </div>
                </li>
                <li className="series-skeletonitem">
                    <div className="series-upperpart">
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className="series-lowerpart">
                        <Skeleton width={'100%'} height={'20px'}/>
                        <Skeleton width={'65%'} height={'20px'}/>
                    </div>
                </li>
            </ul>
        </div>
    );

}

export default SeriesSkeleton;
