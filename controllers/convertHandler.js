/*
*
*
*       Complete the handler logic below
*       
*       
*/

const {checkInput, solve} = require('../controllers/functions.js')

function ConvertHandler() {
  
  this.getNum = function(input) {
      let {num} = checkInput(input)
      return solve(num);
  };
  
  this.getUnit = function(input) {
      let {unit} = checkInput(input.toLowerCase())
      if(unit === 'l') return 'L'
      return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'gal':
        return 'L'
        break;
      case 'L':
        return 'gal'
        break;
      case 'lbs':
        return 'kg'
        break;
      case 'kg':
        return 'lbs'
        break;
      case 'mi':
        return 'km'
        break;
      case 'km':
        return 'mi'
      default:
        return null
    }
    
  };

  this.spellOutUnit = function(unit) {
    let dic = {
      gal: 'gallon',
      'L': 'liter',
      lbs: 'pound',
      kg: 'kilogram',
      mi: 'mile',
      km: 'kilometer'
    }
    // if (num === 1) {
    //   return dic[unit]
    //   } else {
        return dic[unit] + 's'
      // }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result = (() => {
      switch(initUnit){
      case 'gal':
        return initNum*galToL
        break;
      case 'L':
        return initNum/galToL
        break;
      case 'lbs':
        return initNum*lbsToKg
        break;
      case 'kg':
        return initNum/lbsToKg
        break;
      case 'mi':
        return initNum*miToKm
        break;
      case 'km':
        return initNum/miToKm
      default:
        return null
    }
    })()

    return Math.round(result * 100000)/100000
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
