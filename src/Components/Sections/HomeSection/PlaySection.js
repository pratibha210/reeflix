import React, { Component } from 'react';
import '../sections.css';
import RelatedShowSection from './RelatedShowSection';
import PlayVideoComponent from '../../../Common/UIComponents/PlayVideoComponent';
import UpNextSection from './UpNextSection';

function viewAll  () {
    this.props.history.push('/home/viewall')
}

const PlaySection = (props) => {

    
       return (
            <div className="sectionplaypartstart">
                <div className="playsectionmaindiv">
                    <div className="videoplaydiv">
                        <PlayVideoComponent />

                    </div>
                </div>
                <div>
                    <UpNextSection />
                </div>
                <div>
                    <RelatedShowSection viewClick={viewAll}/>
                </div>
            </div>
        );
    
}

export default PlaySection;

