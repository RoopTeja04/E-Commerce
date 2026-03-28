const Router = require("express").Router();
const { CreateNewsLetter } = require("../Controller/NewsController");

// Post Routes
Router.post("/create-news-letter", CreateNewsLetter);

module.exports = Router;