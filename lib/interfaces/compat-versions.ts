/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */

/**
  * @interface
  * @description
  * Interface to evaluate the dependencies compatible versions.
  */
export interface CompatVersions {
  dependency: string;
  from: string;
  to: string;
}
