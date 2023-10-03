import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration } from "webpack";
import WebpackBar from "webpackbar";

const esbuildLoader = {
    loader: "esbuild-loader",
    options: {
        target: "es2019",
    },
};

const rules = [
    {
        test: /\.([tj])sx?$/,
        sideEffects: false,
        exclude: [
            /\.test\.(js|ts|tsx)/,
            // We don't want to transpile node_modules, except those that are not ES5
            /[\\/]node_modules[\\/](?!(react-text-mask-hoc|lodash-es|dom7|swiper)[\\/])/,
        ],
        use: [esbuildLoader],
    },
    {
        test: /\.(sa|sc|c)ss$/,
        sideEffects: true, // Avoid unused imports to be omitted by tree-shaking
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    {
        test: /\.woff2?$/i,
        type: "asset/resource",
        dependency: { not: ["url"] },
    },
    {
        test: /\.ico$/,
        use: {
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
            },
        },
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 10000, // if SVG-file is above 10 KB, load asynchronously. If removed, will be in JS-bundle
                    name: "assets/svg/[name].[contenthash].svg",
                },
            },
        ],
    },
];

const nodeModules = (packagePath: string) => path.resolve(process.cwd(), `node_modules/${packagePath}`);

const resolve = {
    symlinks: false,
    mainFields: ["klp-src", "browser", "module", "main"],
    modules: ["node_modules", path.resolve(process.cwd(), "src")],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css"],
    alias: {
        react: nodeModules("react"),
        "react-dom": nodeModules("react-dom"),
        "@src": path.resolve(__dirname, "src"),
    },
};

export const application: Configuration = {
    name: "application",
    entry: {
        oslobysykkel: path.join(process.cwd(), "src", "index.tsx"),
    },
    output: {
        libraryTarget: "umd",
        publicPath: "",
        path: path.join(process.cwd(), "dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        clean: {
            keep: /page-fragments/,
        },
    },
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

export const core: Configuration = {
    module: {
        rules,
    },
    plugins: [new WebpackBar(), new ForkTsCheckerWebpackPlugin({})],
    resolve,
    resolveLoader: {
        modules: ["node_modules", path.join(__dirname, "../node_modules")],
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json", ".css"],
    },
};
