/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { PropertyUnit, PropertyDetails, PropertyConfig, BuildObjectResponse } from '../interfaces';

import { ClassUtils } from '../utils';
import { ValidatorError, ValidatorDetails, ValidatorRunner } from '@orchejs/validators';

/**
 * @class
 * @description
 * Loader of Property decorators.
 */
export class PropertyLoader {
  private static propertyConfigs: PropertyConfig[] = [];
  private static validatorRunner: ValidatorRunner = new ValidatorRunner();

  static addProperty(target: any, propertyKey: string, details: PropertyDetails) {
    const className = ClassUtils.getClassName(target.constructor);
    if (!className) {
      return;
    }

    const propertyUnit: PropertyUnit = {
      details,
      propertyKey
    };

    let propertyConfig = this.propertyConfigs.find(validator => validator.className === className);

    if (!propertyConfig) {
      propertyConfig = {
        className,
        units: [propertyUnit]
      };
      this.propertyConfigs.push(propertyConfig);
    } else {
      propertyConfig.units!.push(propertyUnit);
    }
  }

  static getProperties(className: string): PropertyUnit[] {
    let properties: PropertyUnit[] = [];
    const propertyConfig = this.propertyConfigs.find(
      validator => validator.className === className
    );

    if (propertyConfig) {
      properties = propertyConfig.units!;
    }

    return properties;
  }

  static loadPropertiesFromObject(value: any, clazz: object): Promise<BuildObjectResponse> {
    if (!clazz) {
      return Promise.reject('The clazz param must not be undefined.');
    }

    const className = ClassUtils.getClassName(clazz);
    if (!className) {
      return Promise.reject('The class name not found');
    }
    
    const propertyUnits: PropertyUnit[] = PropertyLoader.getProperties(className);

    return this.buildObject(value, clazz, propertyUnits);
  }

  private static buildObject(
    value: any,
    clazz: object,
    propertyUnits: PropertyUnit[]
  ): Promise<BuildObjectResponse> {
    let response: BuildObjectResponse;
    let validatorErrors: ValidatorError[] = [];
    return new Promise((resolve, reject) => {
      try {
        const object = Object.create(clazz);
        propertyUnits.forEach(async unit => {
          const details = unit.details;
          if (!details.alias) {
            details.alias = unit.propertyKey;
          }

          const propValue = value[details.alias] || value[unit.propertyKey];
          object[unit.propertyKey] = propValue;

          const validatorDetails = details.validators;

          if (validatorDetails) {
            try {
              const errors: ValidatorError[] = await this.validatorRunner.runValidations(
                propValue,
                unit.propertyKey,
                validatorDetails
              );
  
              if (errors && errors.length > 0) {
                validatorErrors = validatorErrors.concat(errors);
              }
            } catch (error) {
              validatorErrors.push({
                fieldName: unit.propertyKey,
                message: 'An exception happened during validator execution',
                details: error.stack,
                value: propValue
              });
            }
          }
        });
        response = {
          object,
          validatorErrors
        };
        resolve(response);
      } catch (error) {
        reject('An error happened during object creation');
      }
    });
  }
}
