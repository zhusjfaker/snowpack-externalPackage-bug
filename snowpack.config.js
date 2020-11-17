const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const isTS = fs.existsSync(path.join(cwd, 'tsconfig.json'));

module.exports = {
  mount: {
    public: '/',
    src: '/_src_',
    assets: '/assets',
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    [
      'snowpack-plugin-less',
      {
        paths: [
          path.resolve(process.cwd()),
          path.resolve(process.cwd(), '../swagger-analysis'),
        ],
      },
    ],
    ...(isTS
      ? [
          [
            '@snowpack/plugin-run-script',
            { cmd: 'tsc --noEmit', watch: '$1 --watch' },
          ],
          ['@snowpack/plugin-run-script', { cmd: 'npm run style', watch: '' }],
        ]
      : []),
  ],
  devOptions: {
    port: 4000,
    open: 'none',
  },
  buildOptions: {
    sourceMaps: true,
  },
  installOptions: {
    installTypes: isTS,
    treeshake: true,
    externalPackage: ['react', 'react-dom'],
  },
};
