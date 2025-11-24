export default {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
};