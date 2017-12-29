/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { FileMatcher, FindOptions } from 'file-matcher';
import * as R from 'ramda';
import { PathUtils } from '../utils';
import * as path from 'path';

const transformDecoratorNamesToRegex = (decoratorNames: string[]): RegExp => {
  if (!decoratorNames || decoratorNames.length === 0) {
    throw new Error('You must tell at least one decorator name to look for');
  }

  const es5Pattern: string = decoratorNames.join('|');
  const es6Pattern: string = decoratorNames.join('|@');

  const decoratorPattern = new RegExp(
    ['((?=.[^]*__decorate)', '(?=.[^]*', es5Pattern, '))', '|(@', es6Pattern, ')'].join(''),
    'i'
  );
  return decoratorPattern;
};

const prepareDirectoryToSearch = (directory: string): string => {
  let dirToSearch: string = PathUtils.appRoot;
  if (directory) {
    dirToSearch = path.join(dirToSearch, directory);
  }
  return dirToSearch;
};

const decoratorCrawler = (decoratorNames: string[], directory: string): Promise<string[]> => {
  let decoratorPattern;
  let dirToSearch;
  try {
    decoratorPattern = transformDecoratorNamesToRegex(decoratorNames);
    dirToSearch = prepareDirectoryToSearch(directory);
  } catch (err) {
    return Promise.reject(err);
  }

  const fileMatcher = new FileMatcher();
  return fileMatcher.find({
    path: dirToSearch,
    fileFilter: {
      fileNamePattern: ['**/*.js', '**/*.ts', '!decorator.loader*', '!node_modules', '!typings'],
      content: decoratorPattern
    },
    recursiveSearch: true
  });
};

const validateDecoratorFiles = (files: string[]): string[] => {
  if (!files || files.length === 0) {
    throw new Error('No files found!');
  }
  return files;
};

const requireDecoratorFiles = (files: string[]) => {
  const loadedFiles: string[] = files.map(file => {
    try {
      require(file);
      return file;
    } catch (error) {}
  });
  return loadedFiles;
};

const dealDecoratorSearch = R.compose(requireDecoratorFiles, validateDecoratorFiles);

/**
 * Looks for files containing the decorators as specified in decoratorNames param.
 * After finding it will load the files to load the annotation infos.
 *
 * @param {string[]} decoratorNames the decorator names that will be searched for.
 * @param {string} directory the directory to search for decorators. The default value is the
 * app root path.
 * @returns a Promise with all the matches and loaded files.
 */
const loadDecorators = (decoratorNames: string[], directory?: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    decoratorCrawler(decoratorNames, directory)
      .then(files => {
        const loadedFiles = dealDecoratorSearch(files);
        resolve(loadedFiles);
      })
      .catch(error => reject(error));
  });
};

export { loadDecorators, decoratorCrawler };
