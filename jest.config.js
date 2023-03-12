module.exports = {
  // `rootDir` is just a token that Jest substitutes //
  roots: ['<rootDir>/client'],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  setupFilesAfterEnv: ['<rootDir>/client/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: './reports',
          outputName: 'jest-junit.xml'
        }
      ]
    ]
  }
};
