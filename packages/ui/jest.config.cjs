/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  collectCoverageFrom: [
    'src/components/ProgressBar/**/*.{ts,tsx}',
    'src/components/Button/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    './src/components/ProgressBar/ProgressBar.tsx': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }]
  }
}
