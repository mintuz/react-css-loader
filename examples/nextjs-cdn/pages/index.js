import React from 'react';
import { StaticCSS as CSS } from '../../../index';
import Header from '../components/Header';

function Homepage() {
    return (
        <React.Fragment>
            <Header />
            <div>
                My example homepage
            </div>
        </React.Fragment>
    );
}

Homepage.displayName = "Homepage";

export default CSS(Homepage);
