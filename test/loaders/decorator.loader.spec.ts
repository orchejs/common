/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { DecoratorLoader } from '../../';

describe('DecoratorLoader', () => {
  let decoratorLoader: DecoratorLoader;

  before(() => {
    decoratorLoader = new DecoratorLoader();
  });

  describe('#loadDecorators', () => {
    it('Should result in error if the decorator names array is undefined', async () => {
      let result;
      try {
        result = await decoratorLoader.loadDecorators(undefined!);
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should result in error if the decorator names array is empty', async () => {
      let result;
      try {
        result = await decoratorLoader.loadDecorators([]);
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should look for decorators inside a specific directory', async () => {
      let result;
      try {
        result = await decoratorLoader.loadDecorators(['Property'], '/lib');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should result in error if the directory does not exists', async () => {
      let result;
      try {
        result = await decoratorLoader.loadDecorators(['Property'], '/what-a-directory');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });
  });
});
