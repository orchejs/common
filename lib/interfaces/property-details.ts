/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { ValidatorDetails } from '@orchejs/validators';

/**
 * @interface
 * @description
 * PropertyDetails is used by the {@link Property} decorator for the convertion process.
 */
export interface PropertyDetails {
  /**
   * This property must be used if the class in the application has a different name. This is useful
   * to avoid the creation of a function or method to convert the object being converted to the
   * final object.
   */
  alias?: string;
  /**
   * The format attribute may be used as a template for convertions, for example a date pattern.
   * Currently this property is used only for Date convertions.
   */
  format?: string;
  /**
   * List of validators that will be evaluated against the property.
   */
  validators?: ValidatorDetails[];
}
