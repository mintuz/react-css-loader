import React from 'react';
import StaticCSS from './static-container';

export default (Component, opts) => {

    const StaticContainer = StaticCSS(Component, opts);

    const Container = class Container extends StaticContainer {
        componentDidMount() {
            console.log('DynamicCSS');
        }
        render() {
            const safeProps = {
                ...this.props,
            };

            return <Component {...safeProps} />;
        }
    };

    Container.displayName = 'DynamicCSS';
    return Container;
};
