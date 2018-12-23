const Resolver = require('./dist/resolver');
const FileSystemAdapter = require('./dist/adapter/file');
const CDNAdapter = require('./dist/adapter/cdn');

module.exports = {
    Resolver: Resolver,
    FileSystemAdapter: FileSystemAdapter,
    CDNAdapter: CDNAdapter,
};
