import React from 'react';
import './screen.css';
import ProfileSectionv2 from '../Sections/ProfileSection/ProfileSectionv2';
import { Route, Switch } from "react-router-dom";
import EditProfileSection from '../Sections/ProfileSection/EditProfileSection';

const ProfileScreen = (props) => {

    return (
        <div className="profilescreen-start">
            <ProfileSectionv2 />
            <Switch>

                <Route path={`${props.match.url}/editprofile`}
                    component={EditProfileSection} />

                <Route path={`${props.match.url}`}
                    component={ProfileSectionv2} />
            </Switch>
        </div>
    );
}

export default ProfileScreen;