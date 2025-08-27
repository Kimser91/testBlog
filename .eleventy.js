const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough (kopier statiske filer rett til /dist)
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Kolleksjon: alle innlegg tagget "blog"
  eleventyConfig.addCollection("blog", (c) => c.getFilteredByTag("blog"));

  // Nunjucks dato-filter for .njk (enkeltinnlegg osv.)
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    if (!dateObj) return "";
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate).setZone(zone).toFormat(format);
  });

  // Enkelt "year" filter (footer)
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", output: "dist" },

    // 👇 VIKTIG: kjør Liquid i .md slik at filtere fungerer
    markdownTemplateEngine: "liquid",

    // .njk bruker Nunjucks
    htmlTemplateEngine: "njk",

    // hvilke formater som bygges
    templateFormats: ["md", "njk", "html"],
  };
};
