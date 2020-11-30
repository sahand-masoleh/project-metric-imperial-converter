/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function(req, res) {
        try{
          let initNum = convertHandler.getNum(req.query.input)
          let initUnit = convertHandler.getUnit(req.query.input)
          let returnNum = convertHandler.convert(initNum, initUnit);
          let returnUnit = convertHandler.getReturnUnit(initUnit);
          let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

          res.json({
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string
          })
        }
        catch(error) {
          res.send(error.message)
        }
    });
};
