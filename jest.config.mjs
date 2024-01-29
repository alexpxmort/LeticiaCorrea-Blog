import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/test/**',
    '!**/cypress/**',
    '!**/.jest/**',
    '!**/coverage/**',
    '!**/src/ui/styles/theme/**',
    '!**/postcss.config.js',
    '!**/src/pages/_document.tsx',
    '!**/tailwind.config.js'
  ],
  moduleNameMapper: {
    '@test/(.*)$': '<rootDir>/test/$1',
    '@domains/(.*)$': '<rootDir>/src/domains/$1',
    '@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@infra/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@services/(.*)$': '<rootDir>/src/services/$1',
    '@ui/(.*)$': '<rootDir>/src/ui/$1',
    '@public/(.*)$': '<rootDir>/public/$1'
  },

  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$']
};

export default createJestConfig(config);
