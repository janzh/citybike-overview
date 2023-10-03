// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from "./tsconfig.json";

const config = {
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    roots: ["<rootDir>"],
    setupFiles: ["<rootDir>/jest.setup.ts", "core-js", "jest-canvas-mock"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                jsc: {
                    experimental: {
                        plugins: [["jest_workaround", {}]],
                    },
                },
            },
        ],
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es|@klp)"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: "http://localhost/",
    },
    testPathIgnorePatterns: ["node_modules"],
    testRegex: "(\\.(test|spec))\\.(ts|tsx|js)$",
    verbose: true,
};

export default config;
