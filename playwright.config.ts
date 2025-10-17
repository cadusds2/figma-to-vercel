import { defineConfig } from '@playwright/test';

const configuracao = defineConfig({
  testDir: 'tests/e2e',
  reporter: [
    ['list'],
    ['json', { outputFile: 'relatorios/playwright/resultados.json' }],
  ],
  retries: 0,
  timeout: 120000,
  use: {
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

export default configuracao;
