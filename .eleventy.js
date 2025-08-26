const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Kopier statiske filer
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Blogg-kolleksjon
  eleventyConfig.addCollection("blog", c => c.getFilteredByTag("blog"));

  // 🔧 Nunjucks date-filter (bruk i .njk som: {{ date | date("dd.MM.yyyy") }})
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    if (!dateObj) return "";
    // Eleventy kan sende JS Date eller luxon DateTime – normaliser til JS Date først
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate).setZone(zone).toFormat(format);
  });

  return {
    dir: { input: "src", includes: "_includes", output: "dist" }
  };
};
