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
 * Options to initialize the winston File Transport. This interface is based in 
 * {@link FileTransportOptions} from the winston project.
 */
export interface LogFileConfig extends LogConfig {
  logstash?: boolean;
  maxsize?: number;
  rotationFormat?: boolean;
  zippedArchive?: boolean;
  maxFiles?: number;
  eol?: string;
  tailable?: boolean;
  maxRetries?: number;
  filename?: string;
  dirname?: string;
  options?: {
    flags?: string;
    highWaterMark?: number;
  };
  stream?: NodeJS.WritableStream;
}
