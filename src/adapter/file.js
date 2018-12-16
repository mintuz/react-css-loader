import util from 'util';
import fs from 'fs';

const readFile = util.promisify(fs.readFile);

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

export default class FileSystem {
    constructor(opts) {
        this.folderPath = opts.folderPath;
        this.inline = opts.inline;
    }
    resolve(styles, components) {
        return Promise.all(
            styles.map((stylePath, index) => {
                const filePath = `${this.folderPath}/${stylePath}`;
                if (fileExists(filePath)) {
                    return readFile(filePath, 'utf8').then((content) => {
                        return {
                            componentName: components[index],
                            error: null,
                            success: true,
                            path: filePath,
                            content
                        };
                    });
                }

                return Promise.resolve({
                    componentName: components[index],
                    error: new Error('Component stylesheet does not exist'),
                    success: false,
                    path: filePath,
                    content: ''
                });
            })
        );
    }
    render(rawResponse) {
        if (this.inline) {
            return rawResponse
                .filter((style) => {
                    return style.success;
                })
                .reduce((result, style) => {
                    return `${result}<style data-css-component="${
                        style.componentName
                    }">${style.content}</style>`;
                }, '')
                .replace(/\r?\n|\r/g, '')
                .trim();
        }

        return rawResponse
            .filter((style) => {
                return style.success;
            })
            .reduce((result, style) => {
                return `${result}${style.content}`;
            }, '')
            .replace(/\r?\n|\r/g, '')
            .trim();
    }
}
