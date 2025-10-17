const configuracaoBase = require('./jest.config.base');

/** @type {import('jest').Config} */
const configuracaoIntegracao = {
  ...configuracaoBase,
  displayName: 'testes de integração',
  testMatch: ['<rootDir>/tests/integracao/**/*.test.ts', '<rootDir>/tests/integracao/**/*.spec.ts'],
};

module.exports = configuracaoIntegracao;
