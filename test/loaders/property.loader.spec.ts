/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { Property, PropertyLoader, DecoratorLoader } from '../../';
import { EmailValidator, MaxValidator, MinValidator } from '@orchejs/validators';

interface BoatSchema {
  name?: string;
}
const boatObject: BoatSchema = {};

class Boat {
  @Property('name') 
  _name: string;
  @Property({
    validators: [
      {
        validator: EmailValidator
      }
    ]
  })
  _email: string;
  @Property({
    validators: [
      {
        validator: MinValidator
      }
    ]
  })
  _age: string;

  constructor(name?: string, email?: string, age?: string) {
    this._name = name || '';
    this._email = email || '';
    this._age = age || '';
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

describe('PropertyLoader', () => {
  let decoratorLoader: DecoratorLoader;
  let boat: Boat;

  before(() => {
    boat = new Boat('Cadilac', '@email.com', 'three');
    decoratorLoader = new DecoratorLoader();
    decoratorLoader.loadDecorators(['Property']);
  });

  describe('#addProperty', () => {
    it('Should result in error if the target is not a class or function', async () => {
      let result;
      try {
        result = await PropertyLoader.addProperty(boatObject, '', {});
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });
  });

  describe('#loadPropertiesFromObject', () => {
    it('Should result in error if the clazz param is undefined', async () => {
      let result;
      try {
        result = await PropertyLoader.loadPropertiesFromObject({}, undefined!);
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should result in error if the class name was not found', async () => {
      let result;
      try {
        result = await PropertyLoader.loadPropertiesFromObject({}, boatObject);
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should load the boat object', async () => {
      const result = await PropertyLoader.loadPropertiesFromObject(boat, Boat);
      expect(result).to.be.not.undefined;
      expect(result.validatorErrors).length.be.greaterThan(0);
    });
  });
});
