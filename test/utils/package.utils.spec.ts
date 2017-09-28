/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/common/LICENSE
 */
import { expect } from 'chai';
import { PackageUtils } from '../../';

describe('PackageUtils', () => {
  let pkgUtils: PackageUtils;

  before(() => {
    pkgUtils = new PackageUtils();
  });

  describe('#getDescrition', () => {
    it('Should return the app description from package.json', () => {
      const description = pkgUtils.getDescrition();
      expect(description).to.be.not.undefined;
    });
  });

  describe('#getDependencyVersion', () => {
    it('Should return an error if there is not a dependency name', () => {
      let version;
      try {
        version = pkgUtils.getDependencyVersion('');
      } catch (e) {
        expect(e).to.be.not.undefined;
      }
      expect(version).to.be.undefined;
    });

    it('Should return a dependency version from dependencies', () => {
      const version = pkgUtils.getDependencyVersion('file-matcher');
      expect(version).to.be.not.undefined;
    });

    it('Should return a dependency version from devDependencies', () => {
      const version = pkgUtils.getDependencyVersion('ts-node');
      expect(version).to.be.not.undefined;
    });
  });

  describe('#checkDependencyVersion', () => {
    it('Should throw error if the dependency was not found', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('not-a-dependency', '1.0.0');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should throw error if the version to check is undefined', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', undefined);
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should throw error if the version to check is blank', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', '');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should throw error if the version to check contains invalid chars', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', 'asf.sadas');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should throw error if the version to check does not follow the semantic versioning', () => {
      let result;
      try {
        result = pkgUtils.checkDependencyVersion('file-matcher', 'asf.2das');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should return "eq" if the version is the same', () => {
      const result = pkgUtils.checkDependencyVersion('file-matcher', '1.1.0');
      expect(result).to.be.equal('eq');
    });

    it('Should return "gt" if the version param is higher than the dependency', () => {
      const result = pkgUtils.checkDependencyVersion('file-matcher', '1.2.1');
      expect(result).to.be.equal('gt');
    });

    it('Should return "lt" if the version param is lesser than the dependency', () => {
      const result = pkgUtils.checkDependencyVersion('file-matcher', '1.0.1');
      expect(result).to.be.equal('lt');
    });
  });

  describe('#isDependencyVersionCompatible', () => {
    it('Should throw error if the dependency was not found', () => {
      let result;
      try {
        result = pkgUtils.isDependencyVersionCompatible('not-a-dependency', '1.0.0', '1.0.0');
      } catch (error) {
        expect(error).to.be.not.undefined;
      }
      expect(result).to.be.undefined;
    });

    it('Should return false if fromVersion is higher than the dependency in package.json', () => {
      const result = pkgUtils.isDependencyVersionCompatible('file-matcher', '2.0.0', '2.0.0');
      expect(result).to.be.false;
    });

    it('Should return false if toVersion is lesser than the dependency in package.json', () => {
      const result = pkgUtils.isDependencyVersionCompatible('file-matcher', '1.0.0', '1.0.1');
      expect(result).to.be.false;
    });

    it(`Should return true if fromVersion & toVersion are lesser and greater`, () => {
      const result = pkgUtils.isDependencyVersionCompatible('file-matcher', '1.0.0', '2.0.0');
      expect(result).to.be.true;
    });
  });
});
