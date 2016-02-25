import crop from '../../src/utils/crop';
import dataUrlToImage from '../helpers/dataurl-to-image';
import { LARGE_IMAGE } from '../helpers/test-images';

describe('Crop tests', () => {
  it('should crop image to 60x50 (positions x = 10, y = 10)', done => {
    crop(LARGE_IMAGE.path, {x: 10, y: 10, width: 60, height: 50})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(60);
        expect(img.height).to.equal(50);

        done();
      });
  });

  it('should crop image (positions x = 100, y = 200)', done => {
    crop(LARGE_IMAGE.path, {x: 100, y: 200})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(LARGE_IMAGE.width - 100);
        expect(img.height).to.equal(LARGE_IMAGE.height - 200);

        done();
      });
  });

  it('should crop image empty opts', done => {
    crop(LARGE_IMAGE.path, {})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(LARGE_IMAGE.width);
        expect(img.height).to.equal(LARGE_IMAGE.height);

        done();
      });
  });
});
