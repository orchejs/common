/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import * as path from 'path';
import { PathUtils } from '../../';

/**
 * @class
 * @description
 * Functionalities to interact to the project's package.json file.
 */
export class PackageUtils {
  private package: any;

  constructor() {
    this.package = require(path.resolve(PathUtils.appRoot, 'package.json'));
  }

  public getDescrition(): string {
    return this.package['description'];
  }

  public getDependencyVersion(dependencyName: string): string {
    let dependency: string = '';
    if (!dependencyName) {
      throw new Error('Dependency name must be informed!');
    }
    if (this.package['dependencies']) {
      dependency = this.package['dependencies'][dependencyName];
    }
    if (!dependency && this.package['devDependencies']) {
      dependency = this.package['devDependencies'][dependencyName];
    }
    return dependency;
  }

  public checkDependencyVersion(
    dependencyName: string,
    versionToCheck: string = ''
  ): 'eq' | 'lt' | 'gt' | undefined {
    const version = this.getDependencyVersion(dependencyName);
    if (!version) {
      throw new Error('Dependency not found');
    }
    if (!versionToCheck || versionToCheck.replace(/\D+/g, '') === '') {
      throw new Error(`Version cannot be null, undefined or blank and cannot have invalid characters
       other than dots and numbers.`);
    }
    if (version.replace(/\D+/g, '') === versionToCheck.replace(/\D+/g, '')) {
      return 'eq';
    }
    const v1: string[] = version.replace(/[^0-9.]/g, '').split('.');
    const v2: string[] = versionToCheck.replace(/[^0-9.]/g, '').split('.');
    if (v2.length < 3) {
      throw new Error(`Version must be SEMVER compatible, so it should be composed by
       MAJOR.MINOR>PATCH.`);
    }
    let result: 'lt' | 'gt' | undefined;
    for (let idx = 0; idx <= v1.length; idx += 1) {
      if (Number.parseInt(v2[idx]) > Number.parseInt(v1[idx])) {
        result = 'gt';
        break;
      } else if (Number.parseInt(v2[idx]) < Number.parseInt(v1[idx])) {
        result = 'lt';
        break;
      }
    }
    return result;
  }

  public isDependencyVersionCompatible(
    dependencyName: string,
    fromVersion: string,
    toVersion: string
  ): boolean {
    const fromResult = this.checkDependencyVersion(dependencyName, fromVersion);
    if (fromResult === 'gt') {
      return false;
    }
    const toResult = this.checkDependencyVersion(dependencyName, toVersion);
    if (toResult === 'lt') {
      return false;
    }
    return true;
  }
}
