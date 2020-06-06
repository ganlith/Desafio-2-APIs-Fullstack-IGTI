const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');

const gradesControl = require('./controllers/gradesControl');

const routes = express.Router();

routes.get("/", gradesControl.listGrades);

module.exports = routes;
