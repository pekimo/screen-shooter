import ScreenShot from '../src/screen-shot';
import tabsWrapper from '../src/utils/tabs-wrapper';
import dataUrlToImage from './helpers/dataurl-to-image';
import { LARGE_IMAGE, MEDIUM_IMAGE } from './helpers/test-images';

describe('ScreenShot tests', () => {
  let captureStab = null;

  beforeEach(() => {
    captureStab = sinon.stub(tabsWrapper, 'capture');
  });

  afterEach(() => {
    captureStab.restore();
  });

  describe('Tests for large image', () => {
    it('should perform capture | resize | getDataUrl', done => {
      captureStab.returns(Promise.resolve(LARGE_IMAGE.path));

      (new ScreenShot())
        .resize({width: 100, height: 200})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(100);
          expect(img.height).to.equal(200);

          done();
        });
    });

    it('should perform capture | crop | getDataUrl', done => {
      captureStab.returns(Promise.resolve(LARGE_IMAGE.path));

      (new ScreenShot())
        .crop({x: 100, y: 200, width: 1000, height: 1000})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(1000);
          expect(img.height).to.equal(1000);

          done();
        });
    });

    it('should perform capture | crop | resize | getDataUrl', done => {
      captureStab.returns(Promise.resolve(LARGE_IMAGE.path));

      (new ScreenShot())
        .crop({x: 100, y: 200, width: 1000, height: 1000})
        .resize({width: 100, height: 200})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(100);
          expect(img.height).to.equal(200);

          done();
        });
    });
  });

  describe('Tests for medium image', () => {
    it('should perform capture | resize | getDataUrl', done => {
      captureStab.returns(Promise.resolve(MEDIUM_IMAGE.path));

      (new ScreenShot())
        .resize({width: 100, height: 200})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(100);
          expect(img.height).to.equal(200);

          done();
        });
    });

    it('should perform capture | crop | getDataUrl', done => {
      captureStab.returns(Promise.resolve(MEDIUM_IMAGE.path));

      (new ScreenShot())
        .crop({x: 100, y: 200, width: 100, height: 100})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(100);
          expect(img.height).to.equal(100);

          done();
        });
    });

    it('should perform capture | crop | resize | getDataUrl', done => {
      captureStab.returns(Promise.resolve(MEDIUM_IMAGE.path));

      (new ScreenShot())
        .crop({x: 100, y: 200, width: 100, height: 100})
        .resize({width: 150, height: 200})
        .getDataUrl()
        .then(dataUrlToImage)
        .then(img => {
          expect(captureStab.calledOnce).to.be.true;
          expect(img.width).to.equal(150);
          expect(img.height).to.equal(200);

          done();
        });
    });
  });
});
