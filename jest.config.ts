export default {
    transform: {},
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    // collectCoverage: true,
    // collectCoverageFrom: [
    //     "src/**/*.{js,jsx}",
    //     "src/**/*.{ts,tsx}",
    // ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/build/"
    ],
    modulePathIgnorePatterns : [
        "/node_modules/",
        "/build/"
    ]
}