const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  /** Passthrough (kopier statiske filer til /dist) */
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  /** Blogg-kolleksjon + legg på ferdig formatert dato-streng */
  eleventyConfig.addCollection("blog", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("blog");
    posts.forEach((item) => {
      try {
        // Eleventy setter item.date til JS Date (fra front matter eller filnavn)
        const dt = DateTime.fromJSDate(item.date).setZone("Europe/Oslo");
        item.data.formattedDate = dt.toFormat("dd.MM.yyyy");
      } catch (e) {
        item.data.formattedDate = ""; // safe fallback
      }
    });
    return posts;
  });

  /** Nunjucks date-filter for .njk (enkeltinnlegg osv.) */
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    if (!dateObj) return "";
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate).setZone(zone).toFormat(format);
  });

  /** Footer-år */
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", output: "dist" },

    // Disse kan stå slik; dato-problemet er løst uansett via formattedDate
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
