/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { LogConfig } from './';

/**
 * @interface
 * @description
 * Options to initialize the winston Console Transport. This interface is based in 
 * {@link ConsoleTransportOptions} from the winston project.
 */
export interface LogConsoleConfig extends LogConfig {
  logstash?: boolean;
  debugStdout?: boolean;  
}
