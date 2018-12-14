import React from 'react';
import { StaticCSS as CSS } from '../../../../dist';

function Body() {
    return (
        <div className="fake-body">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas amet omnis laudantium autem. Laboriosam, rerum dolorem nostrum, sint ad nam dolor molestias officia corrupti, assumenda quam? Quae, dolores aliquid.
            </p>
        </div>
    );
};

Body.displayName = "Body";

export default CSS(Body);
