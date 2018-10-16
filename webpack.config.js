var path = require("path");
var CopyPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, 'src/client');
const outputPath = path.join(__dirname, 'build/public');

module.exports = {
    entry:path.join(sourcePath, 'index.js'),
    output:{path:outputPath, filename:'bundle.js'},
    plugins:[
        new CopyPlugin([
            {from:path.join(__dirname, 'src/client/index.html'), to:path.join(__dirname,'build', 'public')}
        ])
    ]
}