/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */

import { PropertyUnit } from './';

/**
 * @interface
 * @description
 * Property config, used by the property decorator loader. This file is used only internally by
 * this module.
 */
export interface PropertyConfig {
  className: string;
  units?: PropertyUnit[];
}
