const asyncHandler = require("express-async-handler");
const Search = require("../models/search.models");
const logger = require("../utils/logger.utils");
const getSearchData = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const results = await Search.find(
    { $text: { $search: text } }, // text search condition
    { score: { $meta: "textScore" } }, // project the text score
  ).sort({ score: { $meta: "textScore" } });

  logger.info({
    message: "search data",
    text: text,
    result: results,
  });

  res.status(200).json({
    success: true,
    result: results,
  });
});

module.exports = {
  getSearchData,
};
