import React from 'react';
import { StaticCSS as CSS } from '../../../../dist';

function Body(props) {
    return (
        <div className="fake-body">
            <p>
                {props.text}
            </p>
        </div>
    );
};

Body.displayName = "Body";

export default CSS(Body);
