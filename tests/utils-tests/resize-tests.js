import resize from '../../src/utils/resize';
import dataUrlToImage from '../helpers/dataurl-to-image';
import { LARGE_IMAGE } from '../helpers/test-images';

describe('Resize tests', () => {
  it('should resize image to 200x150', done => {
    resize(LARGE_IMAGE.path, {width: 200, height: 150})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(200);
        expect(img.height).to.equal(150);

        done();
      });
  });

  it('should resize image without opts width', done => {
    resize(LARGE_IMAGE.path, {height: 150})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(LARGE_IMAGE.width);
        expect(img.height).to.equal(150);

        done();
      });
  });

  it('should resize image without opts height', done => {
    resize(LARGE_IMAGE.path, {width: 150})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(150);
        expect(img.height).to.equal(LARGE_IMAGE.height);

        done();
      });
  });

  it('should not resize image', done => {
    resize(LARGE_IMAGE.path, {})
      .then(dataUrlToImage)
      .then(img => {
        expect(img.width).to.equal(LARGE_IMAGE.width);
        expect(img.height).to.equal(LARGE_IMAGE.height);

        done();
      });
  });
});
