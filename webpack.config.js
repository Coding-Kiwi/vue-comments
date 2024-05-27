import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from "vue-loader";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname);
const OUT_DIR = path.resolve(__dirname, 'dist');

export default (env) => {
    const mode = env.production == true ? "production" : "development";
    const devtool = mode == "production" ? false : "inline-source-map";

    return {
        mode: mode,
        entry: './index.js',
        target: 'web',
        devtool: devtool,
        output: {
            filename: '[name].[contenthash].js',
            path: OUT_DIR,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: false,
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(SRC_DIR, 'index.html')
            }),
            new VueLoaderPlugin()
        ],
    };
};