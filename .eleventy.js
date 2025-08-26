module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addCollection("blog", c => c.getFilteredByTag("blog"));
  return { dir: { input: "src", includes: "_includes", output: "dist" } };
};
