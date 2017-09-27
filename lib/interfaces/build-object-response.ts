/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { ValidatorError } from '@orchejs/validators';

/**
 * 
 */
export interface BuildObjectResponse {
  object: any;
  validatorErrors?: ValidatorError[];
}
