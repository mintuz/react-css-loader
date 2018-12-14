import React from 'react';
import Header from './Header';
import Body from './Body';
import { StaticCSS as CSS } from '../../../../dist';

function Root(props) {
    return (
        <React.Fragment>
            <Header />
            <div>
                <Body text={props.bodyText}/>
            </div>
        </React.Fragment>
    );
}

Root.displayName = "Root";

export default CSS(Root, {
    styles() {
        return [
            'core.css',
        ];
    }
});
