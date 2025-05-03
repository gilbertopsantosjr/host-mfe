import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const { ModuleFederationPlugin } = webpack.container;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        publicPath: 'http://localhost:8080/',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                knowledgeManagment: `promise new Promise((resolve, reject) => {
                    import('http://localhost:8082/assets/remoteEntry.js')
                      .then(remote => {
                        if (!remote || !remote.get || !remote.init) {
                          reject(new Error('Remote is not a valid Module Federation container'));
                        } else {
                          resolve(remote);
                        }
                      })
                      .catch(reject);
                  })`
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
}