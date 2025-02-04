module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "cobertura"],
  forceCoverageMatch: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testTimeout: 20000,
};
