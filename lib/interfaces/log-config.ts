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
  * Common properties to log config based on winston {@link GenericTransportOptions} and
  * {@link GenericTextTransportOptions}. 
  */
export interface LogConfig {
  level?: string;
  silent?: boolean;
  raw?: boolean;
  name?: string;
  handleExceptions?: boolean;
  exceptionsLevel?: string;
  humanReadableUnhandledException?: boolean;
  json?: boolean;
  colorize?: boolean;
  colors?: any;
  prettyPrint?: boolean;
  showLevel?: boolean;
  label?: string;
  depth?: number;
  timestamp?: boolean | (() => string | boolean);
  formatter?(options?: any): string;
  stringify?(obj: any): string;  
}
