// HomeBannerSkeleton
import React  from 'react';
import '../sections.css';
import Skeleton from '@material-ui/lab/Skeleton';

const BannerSkeleton = (props) => {

    return (
        <div className="homebanner-skeleton">
            <Skeleton width={'62%'} height={'415px'}/>
        </div>
    );

}

export default BannerSkeleton;
