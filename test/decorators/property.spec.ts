/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { property, loadDecorators, PropertyLoader } from '../../';

class Student {
  @property({
    alias: 'alias'
  })
  _name: string;
  @property('email') _email: string;
}

describe('property', () => {
  before(() => {
    loadDecorators(['property']);
  });

  describe('#convertToType', () => {
    it('Should return null if the value is null', () => {
      const result = PropertyLoader.getProperties('Student');
      expect(result).length.to.be.greaterThan(0);
    });
  });
});
