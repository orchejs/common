import { expect } from 'chai';
import * as path from 'path';
import { PathUtils } from '../../lib/utils/path.utils';

describe('PathUtils', () => {
  describe('appRoot', () => {
    it('Should return the root of the app', () => {
      const appRoot = path.resolve(__dirname, '../../');
      expect(PathUtils.appRoot).to.be.equal(appRoot);
    });
  });

  describe('appDirName', () => {
    it('Should return the project directory name', () => {
      expect(PathUtils.appDirName).to.be.equal('common');
    });
  });

  describe('localConfigFile', () => {
    it('Should return the projects directory with the .orcherc file', () => {
      const localConfigFile = path.join(path.resolve(__dirname, '../../'), '/.orcherc');
      expect(PathUtils.localConfigFile).to.be.equal(localConfigFile);
    });
  });
});
