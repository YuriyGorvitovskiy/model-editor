module.exports = {
    mode: "development",
    target: "electron-renderer",
    entry: "./src/window/window.tsx",
    output: {
        filename: "window-bundle.js",
        path: __dirname + "/build/window"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' and '.tsx' extensions will be handled by 'ts-loader'.
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader', 
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
              }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between
    // builds.
    externals: []
};
