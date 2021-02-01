const express = require('express');

const routes = express.Router();

const CalculatorController = require('../src/controllers/CalculatorController');

routes.get('/calculate' , CalculatorController.index);

module.exports = routes;