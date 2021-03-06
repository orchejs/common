/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { LogConsoleConfig, LogFileConfig } from './';

/**
 * @interface
 * @description
 * Options for the log initialization.
 */
export interface LogOptions {
  disableLog?: boolean;
  fileOptions?: LogFileConfig;
  consoleOptions?: LogConsoleConfig;
}
