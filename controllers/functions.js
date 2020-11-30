exports.checkInput = function (input) {
  let charactersRegex = /[a-z]/i

  let numRegex = /^(\d+(\.\d+)?)((\-|\+|\*|\/)\d+(\.\d+)?)*$/
  let unitRegex = /^(gal|l|lbs|kg|mi|km)$/i

      if (!input.match(charactersRegex)) throw Error('invalid input')
      let index = input.match(charactersRegex).index
      let [num, unit] = [index === 0 ? '1' : input.slice(0, index), input.slice(index)]
      let numTest = numRegex.test(num)
      let unitTest = unitRegex.test(unit)

      if (!numTest && !unitTest) throw Error('invalid number and unit')
      if (!numTest) throw Error('invalid number')
      if (!unitTest) throw Error('invalid unit')
      return ({ num, unit })
}

exports.solve = function(formula) {
  let string = formula.slice();

  let mult = /(\d+(\.\d+)?)\*(\d+(\.\d+)?)/gi;
  let multiplication = string.match(mult);
  while (multiplication) {
    let result = multiplication[0].split("*").reduce((acc, curr) => acc * curr);
    string = string.replace(multiplication, result);
    multiplication = string.match(mult);
  }

  let div = /(\d+(\.\d+)?)\/(\d+(\.\d+)?)/gi;
  let division = string.match(div);
  while (division) {
    let result = division[0].split("/").reduce((acc, curr) => acc / curr);
    string = string.replace(division, result);
    division = string.match(mult);
  }

  let add = /(\d+(\.\d+)?)\+(\d+(\.\d+)?)/gi;
  let addition = string.match(add);
  while (addition) {
    let result = addition[0].split("+").reduce((acc, curr) => acc + curr);
    string = string.replace(addition, result);
    addition = string.match(mult);
  }

  let sub = /(\d+(\.\d+)?)\-(\d+(\.\d+)?)/gi;
  let subtraction = string.match(sub);
  while (subtraction) {
    let result = subtraction[0].split("-").reduce((acc, curr) => acc - curr);
    string = string.replace(subtraction, result);
    subtraction = string.match(mult);
  }

  return parseFloat(string);
}