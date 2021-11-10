module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/sass/_variables.scss";`
      }
    }
  }
};