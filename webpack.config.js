var path = require("path");
var CopyPlugin = require('copy-webpack-plugin');
var vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.v2.rules;

const sourcePath = path.join(__dirname, 'src/client');
const outputPath = path.join(__dirname, 'build/public');

module.exports = {
    entry:path.join(sourcePath, 'index.js'),
    output:{path:outputPath, filename:'bundle.js'},
    module:{
        rules:[
            { test: /\.js$/, loader: 'babel-loader', query:{presets:['babel-preset-env', 'babel-preset-react']}},
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ].concat(vtkRules)
    },
    plugins:[
        new CopyPlugin([
            {from:path.join(__dirname, 'public/index.html'), to:path.join(__dirname,'build', 'public')},
            {from:path.join(__dirname, 'public/index.css'), to:path.join(__dirname,'build', 'public')},
            {from:path.join(__dirname, 'public/favicon.ico'), to:path.join(__dirname,'build', 'public')}            
        ])
    ],
    resolve:{
        alias:{
            K_Manager$ : path.resolve(__dirname, 'src/client/vtkapp/managers/K_Manager.js')
        }
    }
}