export default {
  transform: {},
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  // collectCoverage: true,
  // collectCoverageFrom: [
  //     "src/**/*.{js,jsx}",
  //     "src/**/*.{ts,tsx}",
  // ],
  moduleNameMapper: {
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1'
    },
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  modulePathIgnorePatterns: ['/node_modules/', '/build/']
};
