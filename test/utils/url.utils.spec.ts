/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import * as path from 'path';
import { SortType, UrlUtils } from '../../';

describe('UrlUtils', () => {
  describe('#urlSanitation', () => {
    it('Should return the same value, if the value parameter is already fine', () => {
      const result = UrlUtils.urlSanitation('/test');
      expect(result).to.be.equal('/test');
    });

    it('Should return / if the value parameter is null', () => {
      const result = UrlUtils.urlSanitation(undefined);
      expect(result).to.be.equal('/');
    });

    it('Should return / if the value parameter is empty', () => {
      const result = UrlUtils.urlSanitation('');
      expect(result).to.be.equal('/');
    });

    it('Should return / if the value parameter is /', () => {
      const result = UrlUtils.urlSanitation('/');
      expect(result).to.be.equal('/');
    });

    it('Should return /test if there is not backslashed', () => {
      const result = UrlUtils.urlSanitation('test');
      expect(result).to.be.equal('/test');
    });

    it('Should remove the / in the end of the path, if there is a backslash', () => {
      const result = UrlUtils.urlSanitation('test/');
      expect(result).to.be.equal('/test');
    });
  });

  describe('#transformToSpinalCase', () => {
    it('Should return null if name is undefined', () => {
      const result = UrlUtils.transformToSpinalCase(undefined);
      expect(result).to.be.undefined;
    });

    it('Should return the same value if the text is not compound and it is lowercase', () => {
      const result = UrlUtils.transformToSpinalCase('cars');
      expect(result).to.be.equal('cars');
    });

    it('Should return the value in lowercase if there is any uppercase', () => {
      const result = UrlUtils.transformToSpinalCase('Cars');
      expect(result).to.be.equals('cars');
    });

    it('Should return the value in spinal-case if it is a compound name', () => {
      const result = UrlUtils.transformToSpinalCase('TechCars');
      expect(result).to.be.equal('tech-cars');
    });
  });

  describe('#getPathValue', () => {
    it('Should return null if the value param is undefined', () => {
      const result = UrlUtils.getPathValue(undefined);
      expect(result).to.be.undefined;
    });

    it('Should return an array if the value contains comma', () => {
      const result = UrlUtils.getPathValue('test,test2,test3');
      expect(result).to.be.length(3);
    });

    it('Should return the value if it just a regular value', () => {
      const result = UrlUtils.getPathValue('test');
      expect(result).to.be.equal('test');
    });

    it('Should return a SortType Ascending if the value has +', () => {
      const result = JSON.stringify(UrlUtils.getPathValue('+test'));
      expect(result).to.be.equal('{"name":"test","type":0}');
    });

    it('Should return a SortType Descending if the value has -', () => {
      const result = JSON.stringify(UrlUtils.getPathValue('test-'));
      expect(result).to.be.equal('{"name":"test","type":1}');
    });
  });
});
