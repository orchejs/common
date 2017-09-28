/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { FileMatcher, FindOptions } from 'file-matcher';
import { PathUtils } from '../utils';
import * as path from 'path';

/**
 * @class
 * @description
 * This class is responsible for loading files after searching for decorators. It uses the
 * file-matcher module, which recursivelly looks for files that contains the informed decorators.
 */
export class DecoratorLoader {
  /**
   * Looks for files containing the decorators as specified in decoratorNames param. After finding
   * it will load the files to load the annotation infos.
   * 
   * @param {string[]} decoratorNames the decorator names that will be searched for.
   * @param {string} directory the directory to search for decorators. The default value is the
   * app root path.
   * @returns a Promise with all the matches and loaded files.
   */
  loadDecorators(
    decoratorNames: string[],
    directory?: string
  ): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      if (!decoratorNames || decoratorNames.length === 0) {
        reject('You must tell me at least one decorator name to look for.');
        return;
      }

      const es5Pattern: string = decoratorNames.join('|');
      const es6Pattern: string = decoratorNames.join('|@');
      const decoratorsRegex = new RegExp(
        ['((?=.[^]*__decorate)', '(?=.[^]*', es5Pattern, '))', '|(@', es6Pattern, ')'].join(''),
        'i'
      );

      let dirToSearch: string = PathUtils.appRoot;
      if (directory) {
        dirToSearch = path.join(dirToSearch, directory);
      }

      const fileMatcher = new FileMatcher();
      const criteria: FindOptions = {
        path: dirToSearch,
        fileFilter: {
          fileNamePattern: [
            '**/*.js',
            '**/*.ts',
            '!decorator.loader*',
            '!node_modules',
            '!typings'
          ],
          content: decoratorsRegex
        },
        recursiveSearch: true
      };

      try {
        const files: string[] = await fileMatcher.find(criteria);

        if (!files || files.length === 0) {
          reject('No files found!');
        }

        for (let idx = 0; idx < files.length; idx += 1) {
          const file = files[idx];
          require(file);
        }

        resolve(files);
      } catch (error) {
        reject(error);
      }
    });
  }
}
