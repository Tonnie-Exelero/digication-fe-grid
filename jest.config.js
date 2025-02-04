module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "cobertura"],
  forceCoverageMatch: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-dnd|dnd-core|@react-dnd)"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testTimeout: 20000,
};
