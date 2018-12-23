import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { Resolver, CDNAdapter } from '../../../server';

const app = express();

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const app = React.createElement(App, {
        bodyText: 'hello world, from the server yo',
    });

    const htmlBody = ReactDOMServer.renderToString(app);
    const perfstart = process.hrtime();

    const resolver = new Resolver(app, new CDNAdapter({
        cdnRoot: ``
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

app.listen(8181, () => {
    console.log('Example application running on port 8181');
});
