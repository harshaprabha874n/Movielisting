
const mongooese = require("mongoose");

const movieSchema = new mongooese.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Movie = mongooese.model("Movie", movieSchema);

module.exports = Movie;