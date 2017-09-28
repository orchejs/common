/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */

/**
  * @class
  * @description
  * Utilities to deal with classes.
  */
export class ClassUtils {
  /**
   * Returns the class name from object.
   * 
   * @param {object} obj object to be evaluated
   * @returns undefined or the class name.
   */
  static getClassName(obj: object): undefined | string {
    if (!obj) {
      return undefined;
    }
    const result = obj.toString().match(/(function|class) ([^{(]*)/i);
    if (!result || result.length < 2) {
      return undefined;
    } else {
      return result[2].trim();
    }
  }
}
