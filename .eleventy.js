const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthroughs (bygg: src/* -> dist/*)
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  // BLOGG-kolleksjon: legg på ferdig formatert dato for hvert innlegg
  eleventyConfig.addCollection("blog", (api) => {
    const posts = api.getFilteredByTag("blog");
    posts.forEach((item) => {
      try {
        // item.date er en JS Date (fra front matter eller filnavn YYYY-MM-DD-*)
        const dt = DateTime.fromJSDate(item.date).setZone("Europe/Oslo");
        item.data.formattedDate = dt.toFormat("dd.MM.yyyy");
      } catch (e) {
        item.data.formattedDate = "";
      }
    });
    return posts;
  });

  // Nunjucks-filter for enkeltinnlegg (post.njk)
  eleventyConfig.addFilter("date", (dateObj, format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    if (!dateObj) return "";
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate).setZone(zone).toFormat(format);
  });

  // Shortcode for "Dato nå" (kan brukes i både .md og .njk)
  eleventyConfig.addShortcode("today", (format = "dd.MM.yyyy", zone = "Europe/Oslo") => {
    return DateTime.now().setZone(zone).toFormat(format);
  });

  // Footer-år
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", output: "dist" },
    // Vi bruker Nunjucks overalt (også i .md), så vi slipper Liquid helt
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
