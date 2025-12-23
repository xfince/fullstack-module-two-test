/**
 * jest.config.js
 * 
 * Jest configuration for Module 2 grading tests
 */

module.exports = {
  // Test environment
  testEnvironment: 'node',

  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'grading-folder/src/**/*.{js,jsx}',
    '!grading-folder/src/**/*.test.{js,jsx}',
    '!grading-folder/src/**/*.spec.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**'
  ],

  // Coverage thresholds (optional)
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  },

  // Module paths
  moduleDirectories: ['node_modules', 'grading-folder/node_modules'],

  // Transform files (if needed for JSX)
  transform: {},

  // Setup files
  setupFilesAfterEnv: [],

  // Test timeout
  testTimeout: 30000,

  // Verbose output
  verbose: true,

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/grading-folder/node_modules/'
  ],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Bail on first failure (set to false to run all tests)
  bail: false,

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Max workers (parallel test execution)
  maxWorkers: '50%',

  // Detect open handles
  detectOpenHandles: false,

  // Force exit after tests complete
  forceExit: true,

  // Reporter configuration
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true
      }
    ]
  ],

  // Global setup/teardown
  globalSetup: undefined,
  globalTeardown: undefined,

  // Notify on completion
  notify: false,

  // Coverage reporters
  coverageReporters: ['text', 'lcov', 'html'],

  // Coverage directory
  coverageDirectory: './coverage'
};
