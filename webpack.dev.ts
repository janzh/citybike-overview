import "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { core } from "./webpack.common";

const cwd = process.cwd();

const devConfig: Configuration = {
    mode: "development",
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "",
    },
    devServer: {
        port: 8080,
        static: {
            directory: path.join(cwd, "dist/{name}"),
            watch: {
                aggregateTimeout: 300,
                poll: 500,
            },
        },
        client: {
            logging: "info",
            overlay: false,
        },
        allowedHosts: "all",
        historyApiFallback: false,
        proxy: {
            "/api": {
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
                target: "https://gbfs.urbansharing.com",
            },
        },
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css",
        }),
    ],
};

export default merge(core, devConfig);
