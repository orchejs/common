/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { SortType } from '../../';

/**
 * @interface
 * @description
 * Properties of a sort field, containg information about the field:
 * - field name
 * - SortType: asc or desc
 */
export interface SortField {
  name: string;
  type: SortType;
}
