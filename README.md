# React CSS Loader
A library to load and tree shake standard CSS with a simple, flexible interface allowing you to only load the CSS you need and want, dependent on if your react components are rendering.

## Getting started
To install run `npm install react-css-loader --save`

## Usage

### Client
React CSS Loader provides a Higher Order Component which you pass your own components into and optionally an object as a second paramter with a function called `styles`.

When a displayName is present on your component, react-css-loader will try to resolve the displayName to a css file on the server. For example if you had a displayName of `Header` it will try to resolve to `Header.css`.

You can also define your own styles using the styles function which should return an array of strings.

```
/* ./app.js */
import React from 'react';
import {StaticCSS as CSS} from 'react-css-loader';

const MyComponent = () => {
    return <div className="my-custom-element"/>;
};

MyComponent.displayName = "Header";

export default CSS(MyComponent, {
    styles() {
        return [
            'MyCustomStyle.css',
        ];
    }
});
```

### Server
On the server you need to import the resolver and an adapter. React CSS Loader provides you with two adapters by default, a file system adapter and a CDN adapter but you are able to create your own if you wish.

#### File system
The file system adapter will resolve css files from your local file system and accepts two parameters, the folderPath which is where your CSS files live and an inline boolean which determines what the output string should look like.

##### Inline

```
import App from './app'; /* React application */
import {Resolver, FileSystemAdapter} from 'react-css-loader';

const cssResolver = Resolver(App, new FileSystemAdapter({
    folderPath: `${__dirname}/styles/`,
    inline: true,
}));

const cssString = cssResolver.render();
console.log(cssString);
/*
    <style>
        .my-custom-element {
            background-color: black;
        }
    </style>
    <style>
        .my-custom-element-two {
            background-color: red;
        }
    </style>
*/
```

##### Not Inline

```
import App from './app';
import {Resolver, FileSystemAdapter} from 'react-css-loader';

const cssResolver = Resolver(App, new FileSystemAdapter({
    folderPath: `${__dirname}/styles/`,
    inline: false,
}));

const cssString = cssResolver.render();
console.log(cssString);
/*
    .my-custom-element {
        background-color: black;
    }

    .my-custom-element-two {
        background-color: red;
    }
*/
```

#### CDN File Adapter
If you serve your CSS via a CDN, this is for you. Rather than resolving the CSS files from the filesystem, it will render link tags instead that point to your CSS files on a CDN.

```
import App from './app';
import {Resolver, CDNAdapter} from 'react-css-loader';

const cssResolver = Resolver(App, new CDNAdapter({
    cdnRoot: 'https://my-cdn.com'
}));

const cssString = cssResolver.render();
console.log(cssString);
/*
    <link rel="stylesheet" href="https://my-cdn.com/Header.css">
*/
```
