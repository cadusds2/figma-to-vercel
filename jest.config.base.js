/** @type {import('jest').Config} */
const configuracaoBase = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: false,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: process.env.JEST_JUNIT_OUTPUT_DIR ?? 'relatorios/junit',
        outputName: process.env.JEST_JUNIT_OUTPUT_NAME ?? 'relatorio-junit.xml',
        ancestorSeparator: ' › ',
        suiteNameTemplate: '{filename}',
      },
    ],
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testTimeout: 30000,
};

module.exports = configuracaoBase;
