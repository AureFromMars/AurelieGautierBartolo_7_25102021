module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/sass/_main.scss";`
      }
    }
  }
};