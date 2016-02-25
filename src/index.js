import ScreenShot from './screen-shot';
import resize from './utils/resize';
import crop from './utils/crop';

if (chrome == null || chrome.tabs == null) {
  throw new Error(
    `Error: not exist package "chrome.tabs".
    Check "tabs" in permissions of manifest.json.
    More info https://developer.chrome.com/extensions/tabs`
  );
}

const screenShooter = {
  capture() {
    return new ScreenShot();
  },

  resize(src, opts) {
    return resize(src, opts);
  },

  crop(src, opts) {
    return crop(src, opts);
  }
};

export default screenShooter;
