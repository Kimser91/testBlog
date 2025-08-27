const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Kolleksjon
  eleventyConfig.addCollection("blog", (c) => c.getFilteredByTag("blog"));

  // Nunjucks date-filter (for datoer i innlegg osv.)
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    if (!dateObj) return "";
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate).setZone(zone).toFormat(format);
  });

  // 👇 NYTT: enkelt årstall til footer
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", output: "dist" },
  };
};