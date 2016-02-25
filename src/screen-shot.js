import tabsWrapper from './utils/tabs-wrapper';
import saveImageBlob from './utils/save-image-blob';
import resize from './utils/resize';
import crop from './utils/crop';

class ScreenShot {
  constructor() {
    this._promiseData = tabsWrapper.capture();
  }

  resize(opts) {
    this._promiseData = this._promiseData.then(dataUrl => {
      return resize(dataUrl, opts);
    });

    return this;
  }

  crop(opts) {
    this._promiseData = this._promiseData.then(dataUrl => {
      return crop(dataUrl, opts);
    });

    return this;
  }

  getBlobUrl() {
    return this._promiseData.then(saveImageBlob);
  }

  getDataUrl() {
    return this._promiseData;
  }
}

export default ScreenShot;
