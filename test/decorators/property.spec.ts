/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { Property, DecoratorLoader, PropertyLoader } from '../../';

class Student {
  @Property({
    alias: 'alias'
  })
  _name: string;
  @Property('email')
  _email: string;
}

describe('Property', () => {
  before(() => {
    const decoratorLoader = new DecoratorLoader();
    decoratorLoader.loadDecorators(['Property']);
  });

  describe('#convertToType', () => {
    it('Should return null if the value is null', () => {
      const result = PropertyLoader.getProperties('Student');
      expect(result).length.to.be.greaterThan(0);
    });
  });
});
