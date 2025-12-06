import { defineConfig } from 'tsup';

export default defineConfig([
  // 核心 SDK
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    target: 'node18',
    outDir: 'dist',
  },
  // Express 整合
  {
    entry: ['src/frameworks/express/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18',
    outDir: 'dist/frameworks/express',
    external: ['express'],
  },
  // Fastify 整合
  {
    entry: ['src/frameworks/fastify/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18',
    outDir: 'dist/frameworks/fastify',
    external: ['fastify'],
  },
  // Koa 整合
  {
    entry: ['src/frameworks/koa/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18',
    outDir: 'dist/frameworks/koa',
    external: ['koa'],
  },
  // 共用服務層
  {
    entry: ['src/frameworks/common/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18',
    outDir: 'dist/frameworks/common',
  },
  // CLI 工具
  {
    entry: ['src/cli/index.ts'],
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: false,
    minify: false,
    target: 'node18',
    outDir: 'dist/cli',
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
]);

