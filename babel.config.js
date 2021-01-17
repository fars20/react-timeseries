module.exports = (api) => {
  api.cache(false);
  return {
    presets:  [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react')
    ],
    plugins: [
    ],
  }
}
