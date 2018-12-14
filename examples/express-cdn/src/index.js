import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { path } from 'app-root-path';
import App from './App';
import { Resolver, CDNAdapter } from '../../../dist/index';

const app = express();

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const app = React.createElement(App, {
        bodyText: 'hello world, from the server yo',
    });

    const htmlBody = ReactDOMServer.renderToString(app);

    const resolver = new Resolver(app, new CDNAdapter({
        cdnRoot: ``
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
