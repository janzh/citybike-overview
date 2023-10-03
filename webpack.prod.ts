import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";

import { application, core } from "./webpack.common";

const prodConfig: Configuration = {
    mode: "production",
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        sideEffects: true,
    },
    devtool: "source-map",
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "oslobysykkel_report.html",
            openAnalyzer: false,
            defaultSizes: "gzip",
        }),
    ],
};

export default merge(core, prodConfig, application);
