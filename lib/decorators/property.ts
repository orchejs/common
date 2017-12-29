/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */

import { PropertyLoader } from '../loaders';
import { PropertyDetails } from '../interfaces';

/**
 * @description
 * Decorator used to convert and validate the values of an object.
 *
 * @param {string | PropertyDetails} details
 */
export function property(details: string | PropertyDetails) {
  return (target: any, propertyKey: string) => {
    let propertyDetails: PropertyDetails;

    if (typeof details === 'string') {
      propertyDetails = {
        alias: details
      };
    } else {
      propertyDetails = details;
    }

    PropertyLoader.addProperty(target, propertyKey, propertyDetails);
  };
}
