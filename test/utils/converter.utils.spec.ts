/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { ConverterUtils } from '../../';

describe('ConverterUtils', () => {
  describe('#convertToType', () => {
    it('Should return null if the value is null', () => {
      const result = ConverterUtils.convertToType(null, 'Number');
      expect(result).to.be.null;
    });

    it('Should return undefined if the value is undefined', () => {
      const result = ConverterUtils.convertToType(undefined, 'Number');
      expect(result).to.be.undefined;
    });

    it('Should return a Number if the type is Number', () => {
      const result = ConverterUtils.convertToType('1', 'Number');
      expect(result).to.be.equal(1);
    });

    it('Should return NaN if the type is Number and value is not a number', () => {
      const result = ConverterUtils.convertToType('Aaa', 'Number');
      expect(result).to.be.NaN;
    });
    
    it('Should return a string if the type is String', () => {
      const result = ConverterUtils.convertToType('Aaa', 'String');
      expect(result).to.be.equal('Aaa');
    });

    it('Should return a boolean if the type is Boolean', () => {
      const result = ConverterUtils.convertToType('true', 'Boolean');
      expect(result).to.be.true;
    });
    
    it('Should return true if the type is Boolean and value is neither true or false', () => {
      const result = ConverterUtils.convertToType('any value', 'Boolean');
      expect(result).to.be.true;
    });

    it('Should return a symbol if the type is Symbol', () => {
      const result = ConverterUtils.convertToType('true', 'Symbol');
      expect(typeof result).to.be.equal('symbol');
    });

    it('Should return a Date if the type is Date', () => {
      const result = ConverterUtils.convertToType('2017-09-27 23:04:04', 'Date');
      expect(result.toUTCString()).to.be.equal(new Date('2017-09-27 23:04:04').toUTCString());
    });    

    it('Should return an Array, spliting the string by these separators: ; ou ,', () => {
      const result = ConverterUtils.convertToType('column1,column2;column3', 'Array');
      expect(result.length).to.be.equal(3);
    }); 

    it('Should return an Array if type is Array and value is not a string', () => {
      const result = ConverterUtils.convertToType([1,2], 'Array');
      expect(result.length).to.be.equal(2);
    });
    
    it('Should return return the same value if type not found', () => {
      const result = ConverterUtils.convertToType({ msg: 'test' }, 'Object');
      expect(result.msg).to.be.equal('test');
    });    
  });
});
