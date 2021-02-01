const calculatorHours = require('../utils/calculatorHours');

class CalculatorController {
  async index(request, response) {
    const {
       from, to
    } = request.query;


    // console.log(request.query)

    // calculatorHours(schedule)

    return response.status(201).json(calculatorHours({from, to}));
  }
}

module.exports = new CalculatorController();
