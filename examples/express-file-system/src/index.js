import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { path } from 'app-root-path';
import App from './App';
import { Resolver, FileSystemAdapter } from '../../../server';

const app = express();

app.get('/', (req, res) => {
    const app = React.createElement(App, {
        bodyText: 'hello world, from the server yo',
    });

    const htmlBody = ReactDOMServer.renderToString(app);
    const perfstart = process.hrtime();

    const resolver = new Resolver(app, new FileSystemAdapter({
        folderPath: `${path}/styles`,
        inline: true,
    }));

    resolver.render()
        .then(css => {
            const perfEnd = process.hrtime(perfstart);
            console.log('CSS Render time: %ds %dms', perfEnd[0], perfEnd[1] / 1000000);

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
    console.log('Example application running on port 8080');
});
