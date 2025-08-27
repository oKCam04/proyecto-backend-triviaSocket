import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  experimental: {
    mergeMultipartFieldsAndFiles: true,
    shutdownInReverseOrder: true,
  },

  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
  ],

  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    () => import('@adonisjs/core/providers/vinejs_provider'),
    () => import('@adonisjs/cors/cors_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),

    () => import('./providers/socketProvider.js'),
  ],

  preloads: [
    () => import('#start/routes'),
    () => import('#start/kernel'),
    // ❌ quita aquí cualquier preload de socket
  ],

  tests: {
    suites: [
      { files: ['tests/unit/**/*.spec(.ts|.js)'], name: 'unit', timeout: 2000 },
      { files: ['tests/functional/**/*.spec(.ts|.js)'], name: 'functional', timeout: 30000 },
    ],
    forceExit: false,
  },
})
