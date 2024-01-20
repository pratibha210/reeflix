// SubscriptionScreen
import React from 'react';
import './screen.css';
import SubscriptionPlansSection from '../Sections/SubscriptionPlansSection';


const SubscriptionScreen = (props) => {

    return (
        <div className="subscription-screen">
            <SubscriptionPlansSection/>
        </div>
    );
}

export default SubscriptionScreen;