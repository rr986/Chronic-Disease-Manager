export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  extensionsToTreatAsEsm: ['.jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/server/tests/'], // Add this line
};