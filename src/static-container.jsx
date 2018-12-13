import React from 'react';

export default (Component, opts) => {
    const Container = class Container extends React.Component {
        constructor(props) {
            super(props);
            this.getStyles = this.getStyles.bind(this);
        }

        getStyles() {
            const defaultStylePaths = [];

            if (Component.displayName) {
                defaultStylePaths.push(`${Component.displayName}.css`);
            }

            const consumerDefinedStyles = opts && opts.styles
                ? opts.styles(this.props, this.state)
                : [];

            return {
                componentName: Component.displayName
                    ? Component.displayName
                    : '',
                stylePaths: [].concat(
                    defaultStylePaths, consumerDefinedStyles
                )
            };
        }

        render() {
            const safeProps = {
                ...this.props,
            };

            return <Component {...safeProps} />;
        }
    };

    Container.displayName = 'StaticCSS';
    return Container;
};
