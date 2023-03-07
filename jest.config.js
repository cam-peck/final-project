module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js'
  }
};
