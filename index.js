console.log("helo");
console.log(require('./dist/static-container'));

module.exports = {
    StaticCSS: require('./dist/static-container').default,
    DynamicCSS: require('./dist/dynamic-container').default,
    Resolver: require('./dist/resolver').default,
};

