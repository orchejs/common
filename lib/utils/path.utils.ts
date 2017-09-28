/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import * as path from 'path';
import * as appRootPath from 'app-root-path';
import { OrcheValues } from '../../';

/**
 * @class
 * @description
 * Utilities to deal to application paths. Should be only used internally by the project.
 */
export class PathUtils {
  static appRoot: string = appRootPath.path;
  static appDirName: string = path.basename(appRootPath.path);
  static localConfigFile: string = path.resolve(
    appRootPath.path,
    './'.concat(OrcheValues.configFile)
  );
}
