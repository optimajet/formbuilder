var webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var config = {
    // TODO: Add common Configuration
    module: {},
    plugins: []
};

module.exports = (env) => {
    const isDevBuild = !(env ? env.prod : process.env && process.env.NODE_ENV === "production");

    var viewerConfig = Object.assign({}, config, {
        name: "app",
        entry: ["babel-polyfill", "./formbuilderdev-viewer.js"],
        mode: isDevBuild ? "development" : "production",
        output: {
          filename: "formbuilderdev-viewer.js",
          path: __dirname + "/build"
        },

        module: {
            rules: [
                {
                    test: /.jsx?$/, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        }
                    }
                },
                { test: /\.scss$/, use: 'style-loader!css-loader!sass-loader' }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
        }
    });

    var builderConfig = Object.assign({}, config, {
        name: "app",
        entry: ["babel-polyfill", "./formbuilderdev-builder.js"],
        mode: isDevBuild ? "development" : "production",
        output: {
          filename: "formbuilderdev-builder.js",
          path: __dirname + "/build"
        },

        module: {
            rules: [
                {
                    test: /.jsx?$/, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        }
                    }
                },
                { test: /\.scss$/, use: 'style-loader!css-loader!sass-loader' }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
        }
    });

    var formConfig = Object.assign({}, config, {
        name: "app",
        entry: ["babel-polyfill", "./formsample.js"],
        mode: isDevBuild ? "development" : "production",
        output: {
          filename: "formsample.js",
          path: __dirname + "/build"
        },

        module: {
            rules: [
                {
                    test: /.jsx?$/, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        }
                    }
                },
                { test: /\.scss$/, use: 'style-loader!css-loader!sass-loader' }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.json', '.jsx', '.css', '.scss']
        }
    });

    return [
        viewerConfig,
        builderConfig,
        formConfig
    ];
};