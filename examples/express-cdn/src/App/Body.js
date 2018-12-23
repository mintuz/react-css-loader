import React from 'react';
import { StaticCSS as CSS } from '../../../../';

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
