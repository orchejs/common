/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { ClassUtils } from '../../';

abstract class SomeClass {
  abstract method1(): void;
}

function someFunction() {}

interface SomeInterface {}
const someInterface: SomeInterface = {};

describe('ClassUtils', () => {
  describe('#getClassName', () => {
    it('Should return the class name SomeClass', () => {
      const result = ClassUtils.getClassName(SomeClass);
      expect(result).to.be.equal('SomeClass');
    });

    it('Should return the function name someFuction', () => {
      const result = ClassUtils.getClassName(someFunction);
      expect(result).to.be.equal('someFunction');
    });

    it('Should return undefined if the object is null or undefined', () => {
      const result = ClassUtils.getClassName(undefined!);
      expect(result).to.be.undefined;
    });

    it('Should return undefined if the object is not a valid function or class', () => {
      const result = ClassUtils.getClassName(someInterface);
      expect(result).to.be.undefined;
    });    
  });
});
