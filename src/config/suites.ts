import { TESTS } from './environment';

const suites = {
  UI: '*/ui/**/*.test.ts',
  API: '*/api/**/*.test.ts',
  SINGLE: '*/ui/**/quick-check.test.ts',
};

let suiteName: keyof typeof suites;

if (TESTS === 'UI') suiteName = 'UI';
else if (TESTS === 'API') suiteName = 'API';
else suiteName = 'SINGLE';

export default suites[suiteName];
