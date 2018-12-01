function convertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numeralString='';
    //split input
    let charRegex = /[a-z]+$/i;
    let indexOfChar = input.search(charRegex);
    if (indexOfChar >= 0) {
      numeralString += input.slice(0, indexOfChar);
    } else {
      numeralString += input;
    }
    //looking for valid numbers
    let numRegex = /^([0-9]+(\.[0-9]+)?)(\/([0-9]+\.[0-9]+|[1-9]+))?$/;
    let found = numRegex.exec(numeralString);
    if (found !== null) {
      let a = Number(found[1]);
      let b = found[4] ? Number(found[4]) : 1;
      result = a / b;
    } else {
      // If nothing found, check for non-number input
      let nonRegex = /[^0-9]+/;
      if (nonRegex.test(numeralString)) { result = NaN; }
      else { result = 1; }
    }
    if (isNaN(result)) { return 'invalid number'; }
    else { return Number(result.toFixed(5)); }
  };
  
  
  this.getUnit = function(input) {
    let result;
    let charRegex = /[a-z]+$/i;
    let charString = '';
    let indexOfChar = input.search(charRegex);
    if (indexOfChar >= 0) {
      charString += input.slice(indexOfChar);
    } else {
      result = 'invalid unit';
    }
    let unitRegex = /^(gal|l|mi|km|lbs|kg)$/i;
    let found = unitRegex.exec(charString);
    if (found === null) { result = 'invalid unit'; }
    else { result = found[1]; }
    return result.toLowerCase();
};
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if(initUnit==='gal') {
      var returnUnit = 'l';
      return returnUnit;
    }
    else if(initUnit==='l') {
      var returnUnit = 'gal';
      return returnUnit;
    }
    else if(initUnit==='lbs') {
      var returnUnit = 'kg';
      return returnUnit;
    }
    else if(initUnit==='kg') {
      var returnUnit = 'lbs';
      return returnUnit;
    }
    else if(initUnit==='mi') {
      var returnUnit = 'km';
      return returnUnit;
    }
    else if(initUnit==='km') {
      var returnUnit = 'mi';
      return returnUnit;
    }
    else {
      return initUnit + ' cannot be converted' 
    }
    
    return result;
};

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'invalid unit';
    }
    return result;
};
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result = Number(initNum);
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result *= galToL;
        break;
      case 'l':
        result /= galToL;
        break;
      case 'lbs':
        result *= lbsToKg;
        break;
      case 'kg':
        result /= lbsToKg;
        break;
      case 'mi':
        result *= miToKm;
        break;
      case 'km':
        result /= miToKm;
        break;
      default:
        result = NaN;
    }
    if (isNaN(result)) { 
      return 'invalid number'; 
    }
    return Number(result.toFixed(5));
};
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    if(initNum === 'invalid number' && initUnit === 'invalid unit') {
      result = 'invalid number and unit';
    } else if (initNum ==='invalid number') {
      result = 'invalid number';
    } else if (initUnit === 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
    return result;
  };
}


module.exports = convertHandler;

