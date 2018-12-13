export default class CDN {
    constructor(opts) {
        this.cdnRoot = opts.cdnRoot;
    }
    resolve(styles, components) {
        return Promise.all(
            styles.map((stylePath, index) => {
                const filePath = `${this.cdnRoot}/${stylePath}`;
                return Promise.resolve({
                    componentName: components[index],
                    error: null,
                    success: true,
                    path: filePath,
                    content: `<link data-css-component="${
                        components[index]
                    }" rel="stylesheet" href="${filePath}">`
                });
            })
        );
    }
    render(rawResponse) {
        return rawResponse
            .filter((style) => {
                return style.success;
            })
            .reduce((result, style) => {
                return `${result}${style.content}`;
            }, '');
    }
}
