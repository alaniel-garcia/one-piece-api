module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@utils': './src/utils',
          '@routes': './src/routes'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
};
