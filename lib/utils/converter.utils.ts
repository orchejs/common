/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import * as moment from 'moment';

/**
 * @class
 * @description
 * Utilities for convertions.
 */
export class ConverterUtils {
  /**
   * Convert a string value to its correspondent type.
   * 
   * @param value value to be converted
   * @param type can be a Number, String, Boolean, Symbol, Date, Array or Object.
   * @param dateFormat format for date convertion. The default value is YYYY-MM-DD HH:mm:ss.
   * @returns the value converted to the specified type 
   */
  static convertToType(value: any, type: any, dateFormat: string = 'YYYY-MM-DD HH:mm:ss'): any {
    let val: any;

    if (value === undefined || value === null) {
      return value;
    }

    switch (type) {
      case 'Number':
        val = +value;
        break;
      case 'String':
        val = String(value);
        break;
      case 'Boolean':
        val = Boolean(value);
        break;
      case 'Symbol':
        val = Symbol(value);
        break;
      case 'Date':
        val = moment(value, dateFormat).toDate();
        break;
      case 'Array':
        if (typeof value === 'string') {
          val = value.split(/\;|\,/ig);
        } else {
          val = value;
        }
        break;
      default:
        val = value;
    }
    return val;
  }
}
