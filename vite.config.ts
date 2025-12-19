import { defineConfig } from 'vitest/config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

const angularProject = (name: string, root: string) => ({
  extends: true as const,
  plugins: [
    angular({ tsconfig: resolve(__dirname, root, 'tsconfig.spec.json') }),
  ],
  test: {
    name,
    root: resolve(__dirname, root),
    environment: 'jsdom' as const,
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [resolve(__dirname, root, 'src/test-setup.ts')],
  },
});

export default defineConfig({
  plugins: [nxViteTsPaths()],
  test: {
    globals: true,
    projects: [
      angularProject('shop', 'apps/shop'),
      angularProject('shop-data', 'libs/shop/data'),
      angularProject('shop-shared-ui', 'libs/shop/shared-ui'),
      angularProject('shop-feature-products', 'libs/shop/feature-products'),
      angularProject(
        'shop-feature-product-detail',
        'libs/shop/feature-product-detail'
      ),
      {
        extends: true,
        test: {
          name: 'api-products',
          root: resolve(__dirname, 'libs/api/products'),
          environment: 'node',
          include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
          ],
        },
      },
    ],
  },
});
