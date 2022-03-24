const config = require("@Xxx-js/Xxx-styles/tailwind.config");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  ...config,
};
