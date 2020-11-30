/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '4/2L';
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '3/1.5L';
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '4..2L'
      try{
        convertHandler.getNum(input)
      }
      catch(error){
        assert.equal(error.message, 'invalid number')
        done()
      }
    });
    
    test('No Numerical Input', function(done) {
      let input = 'L';
        assert.equal(convertHandler.getNum(input), 1);
        done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function(done) {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach((ele)=> {
        let res = convertHandler.getUnit(ele)
        if (['l', 'L'].includes(ele)){
          assert.equal(res, 'L')
        } else {
          assert.equal(res, ele.toLowerCase())
        }
      })
      done();
    })
    
    test('Unknown Unit Input', function(done) {
      let input = '2min'
      try{
        convertHandler.getUnit(input)
      }
      catch(error){
        assert.equal(error.message, 'invalid unit')
        done()
      }
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});