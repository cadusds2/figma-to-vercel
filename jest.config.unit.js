const configuracaoBase = require('./jest.config.base');

/** @type {import('jest').Config} */
const configuracaoUnitarios = {
  ...configuracaoBase,
  displayName: 'testes unitários',
  testMatch: ['<rootDir>/tests/unit/**/*.test.ts', '<rootDir>/tests/unit/**/*.spec.ts'],
};

module.exports = configuracaoUnitarios;
