/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { PropertyDetails } from './';

/**
 * @interface
 * @description
 * Property unit, used by the property decorator loader. This file is used only internally by
 * this module. 
 */
export interface PropertyUnit {
  propertyKey: string;
  details: PropertyDetails;
}
