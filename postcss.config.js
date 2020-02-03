const cssnano = require("cssnano");

console.log("=== POST CSS  ===");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html"],
  whitelist: ["flip"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    cssnano({
      preset: "default"
    }),
    require("autoprefixer"),
    purgecss
  ]
};
