import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { path } from 'app-root-path';
import App from './App';
import { Resolver, FileSystemAdapter } from '../../../dist/index';

const app = express();

app.get('/', (req, res) => {
    const htmlBody = ReactDOMServer.renderToString(React.createElement(App, {
        bodyText: 'hello world, from the server yo',
    }));

    const resolver = new Resolver(App, new FileSystemAdapter({
        folderPath: `${path}/styles`,
        inline: true,
    }));

    resolver.render()
        .then(css => {
            res.send(`
            <html>
                <head>
                    ${css}
                </head>
                <body>
                    ${htmlBody}
                </body>
            </html>
            `);
        });
});

app.listen(8080, () => {
    console.log('Example application running');
});
