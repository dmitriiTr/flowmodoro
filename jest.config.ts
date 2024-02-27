/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

};

export default config;