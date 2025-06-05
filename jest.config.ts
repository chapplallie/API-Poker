// jest.config.ts
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig.json');

export default {
  // 1) Indique à Jest d’utiliser ts-jest comme preset :
  preset: 'ts-jest',

  // 2) On teste en environnement Node.js
  testEnvironment: 'node',

  // 3) Où démarrer la recherche des tests :
  rootDir: '.',
  roots: ['<rootDir>/src'],

  // 4) Quels fichiers sont considérés comme tests :
  testRegex: '.*\\.spec\\.ts$',

  // 5) Extensions gérées par Jest
  moduleFileExtensions: ['ts', 'js', 'json'],

  // 6) Transforme tout fichier .ts avec ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // 7) Pour que vos alias “src/…” issus de tsconfig.json fonctionnent:
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
