import React from 'react';
import reactTreeWalker from 'react-tree-walker';

export default class Resolver {
    constructor(app, adapter) {
        this.app = app;
        this.adapter = adapter;
    }
    resolve() {
        let styles = [];
        let components = [];

        return reactTreeWalker(this.app, (element, instance) => {
            if (instance && instance.getStyles) {
                const stylesObject = instance.getStyles();
                const alreadyContainStyle = styles.some((e) =>
                    stylesObject.stylePaths.includes(e)
                );

                if (alreadyContainStyle) {
                    return;
                }

                styles = [...styles, ...stylesObject.stylePaths];
                components = [...components, stylesObject.componentName];
            }
        }).then(() => {
            return this.adapter.resolve(styles, components);
        });
    }
    render() {
        console.log("hello");
        return this.resolve().then((rawResponse) => {
            console.log(rawResponse);
            return this.adapter.render(rawResponse);
        });
    }
}
