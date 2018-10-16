var path = require("path");

const sourcePath = path.join(__dirname, './client/src');
const outputPath = path.join(__dirname, './client/build');

module.exports = {
    entry:path.join(sourcePath, 'index.js'),
    output:{
        path:outputPath,
        filename:'bundle.js'
    }
}