/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { ValidatorError } from '@orchejs/validators';

/**
 * @interface
 * @description
 * Response from the building object execution.
 */
export interface BuildObjectResponse {
  /**
   * Object after the convertion.
   */
  object: any;
  /**
   * List of errors from the building object execution. If there is no errors, the result here is
   * an empty array.
   */
  validatorErrors?: ValidatorError[];
}
