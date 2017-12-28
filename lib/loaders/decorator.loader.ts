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

const validateDecoratorNamesParameter = (decoratorNames: string[]): boolean => {
  return decoratorNames && decoratorNames.length > 0;
};

const validateDirectoryToSearch = (directory: string) => {
  let dirToSearch: string = PathUtils.appRoot;
  if (directory) {
    dirToSearch = path.join(dirToSearch, directory);
  }
  return dirToSearch;
};

const validateDecoratorCrawlerEntry = (
  decoratorNames: string[],
  directory?: string
): Promise<any> => {
  if (!validateDecoratorNamesParameter(decoratorNames)) {
    return Promise.reject('You must tell me at least one decorator name to look for');
  }
  const dirToSearch = validateDirectoryToSearch(directory);
  return Promise.resolve([decoratorNames, dirToSearch]);
};

const decoratorCrawler = (decoratorNames: string[], directory: string): Promise<string[]> => {
  const es5Pattern: string = decoratorNames.join('|');
  const es6Pattern: string = decoratorNames.join('|@');

  const decoratorsRegex = new RegExp(
    ['((?=.[^]*__decorate)', '(?=.[^]*', es5Pattern, '))', '|(@', es6Pattern, ')'].join(''),
    'i'
  );

  const fileMatcher = new FileMatcher();
  return fileMatcher.find({
    path: directory,
    fileFilter: {
      fileNamePattern: ['**/*.js', '**/*.ts', '!decorator.loader*', '!node_modules', '!typings'],
      content: decoratorsRegex
    },
    recursiveSearch: true
  });
};

const validateDecoratorFiles = (files: string[]): Promise<string[]> => {
  if (!files || files.length === 0) {
    return Promise.reject('No files found!');
  }
  return Promise.resolve(files);
};

const requireDecoratorFiles = (files: string[]): Promise<string[]> => {
  const loadedFiles: string[] = files.map(file => {
    try {
      require(file);
      return file;
    } catch (error) {}
  });
  return Promise.resolve(loadedFiles);
};

/**
 * Looks for files containing the decorators as specified in decoratorNames param. After finding
 * it will load the files to load the annotation infos.
 *
 * @param {string[]} decoratorNames the decorator names that will be searched for.
 * @param {string} directory the directory to search for decorators. The default value is the
 * app root path.
 * @returns a Promise with all the matches and loaded files.
 */
export const loadDecorators = R.compose(
  requireDecoratorFiles,
  validateDecoratorFiles,
  decoratorCrawler,
  validateDecoratorCrawlerEntry
);
