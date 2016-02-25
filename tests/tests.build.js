(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./utils-tests/resize-tests');

require('./utils-tests/crop-tests');

require('./utils-tests/object-utils');

require('./screen-shot-tests');

},{"./screen-shot-tests":11,"./utils-tests/crop-tests":12,"./utils-tests/object-utils":13,"./utils-tests/resize-tests":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tabsWrapper = require('./utils/tabs-wrapper');

var _tabsWrapper2 = _interopRequireDefault(_tabsWrapper);

var _saveImageBlob = require('./utils/save-image-blob');

var _saveImageBlob2 = _interopRequireDefault(_saveImageBlob);

var _resize2 = require('./utils/resize');

var _resize3 = _interopRequireDefault(_resize2);

var _crop2 = require('./utils/crop');

var _crop3 = _interopRequireDefault(_crop2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenShot = function () {
  function ScreenShot() {
    _classCallCheck(this, ScreenShot);

    this._promiseData = _tabsWrapper2.default.capture();
  }

  _createClass(ScreenShot, [{
    key: 'resize',
    value: function resize(opts) {
      this._promiseData = this._promiseData.then(function (dataUrl) {
        return (0, _resize3.default)(dataUrl, opts);
      });

      return this;
    }
  }, {
    key: 'crop',
    value: function crop(opts) {
      this._promiseData = this._promiseData.then(function (dataUrl) {
        return (0, _crop3.default)(dataUrl, opts);
      });

      return this;
    }
  }, {
    key: 'getBlobUrl',
    value: function getBlobUrl() {
      return this._promiseData.then(_saveImageBlob2.default);
    }
  }, {
    key: 'getDataUrl',
    value: function getDataUrl() {
      return this._promiseData;
    }
  }]);

  return ScreenShot;
}();

exports.default = ScreenShot;

},{"./utils/crop":3,"./utils/resize":5,"./utils/save-image-blob":6,"./utils/tabs-wrapper":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crop;

var _objectUtils = require('./object-utils');

var _objectUtils2 = _interopRequireDefault(_objectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crop(src) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var isWithoutProps = _objectUtils2.default.notContains(opts, ['x', 'y', 'width', 'height']);

  if (isWithoutProps) {
    return Promise.resolve(src);
  }

  var x = opts.x;
  var y = opts.y;
  var width = opts.width;
  var height = opts.height;


  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var image = new Image();

    image.onload = function () {
      var sX = x || 0;
      var sY = y || 0;
      var sWidth = width || image.width - sX;
      var sHeight = height || image.height - sY;

      canvas.width = sWidth;
      canvas.height = sHeight;

      context.drawImage(image, sX, sY, sWidth, sHeight, 0, 0, sWidth, sHeight);

      resolve(canvas.toDataURL());
    };

    image.src = src;
  });
};

},{"./object-utils":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  contains: function contains(obj, properties) {
    return properties.every(function (property) {
      return obj.hasOwnProperty(property);
    });
  },
  notContains: function notContains(obj, properties) {
    return properties.every(function (property) {
      return !obj.hasOwnProperty(property);
    });
  },
  containsAtLeastOne: function containsAtLeastOne(obj, properties) {
    return properties.some(function (property) {
      return obj.hasOwnProperty(property);
    });
  }
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resize;

var _objectUtils = require('./object-utils');

var _objectUtils2 = _interopRequireDefault(_objectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize(src) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var isWithoutProps = _objectUtils2.default.notContains(opts, ['width', 'height']);

  if (isWithoutProps) {
    return Promise.resolve(src);
  }

  var width = opts.width;
  var height = opts.height;


  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var image = new Image();

    image.onload = function () {
      var resizeWidth = width || image.width;
      var resizeHeight = height || image.height;

      canvas.width = resizeWidth;
      canvas.height = resizeHeight;

      context.drawImage(image, 0, 0, resizeWidth, resizeHeight);

      resolve(canvas.toDataURL());
    };

    image.src = src;
  });
};

},{"./object-utils":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveImageBlob;
var dataURLToBlob = function dataURLToBlob(dataURL) {
  var BASE64_MARKER = ';base64,';

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

function saveImageBlob(dataUrl) {
  var blob = dataURLToBlob(dataUrl);
  return URL.createObjectURL(blob);
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapChromeApi = require('./wrap-chrome-api');

var _wrapChromeApi2 = _interopRequireDefault(_wrapChromeApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chrome = chrome;
var tabs = _chrome.tabs;

var tabsApi = _wrapChromeApi2.default.bind(null, tabs);

var tabsWrapper = {
  getAllCurrentWindow: function getAllCurrentWindow() {
    return tabsApi('query', { currentWindow: true });
  },
  get: function get(id) {
    return tabsApi('get', id);
  },
  getCurrent: function getCurrent() {
    return tabsApi('getCurrent');
  },
  isCurrent: function isCurrent(id) {
    return tabsApi('getCurrent').then(function (tab) {
      return tab.id == id;
    });
  },
  create: function create(url) {
    return tabsApi('create', { url: url });
  },
  activate: function activate(id) {
    return tabsApi('update', id, { active: true });
  },
  pin: function pin(id) {
    return tabsApi('update', id, { pinned: true });
  },
  unpin: function unpin(id) {
    return tabsApi('update', id, { pinned: false });
  },
  close: function close(id) {
    return tabsApi('remove', id);
  },
  reload: function reload(id) {
    return tabsApi('reload', id);
  },
  duplicate: function duplicate(id) {
    return tabsApi('duplicate', id);
  },
  capture: function capture() {
    return tabsApi('captureVisibleTab', null, { format: 'png' });
  }
};

var EVENTS_TABS = ['Updated', 'Created', 'Removed', 'Detached', 'Attached', 'Activated', 'Highlighted'];

EVENTS_TABS.forEach(function (event) {
  var on = 'on' + event;
  var off = 'off' + event;

  tabsWrapper[on] = function (callback) {
    tabs[on].addListener(callback);
    return tabsWrapper;
  };

  tabsWrapper[off] = function (callback) {
    tabs[on].removeListener(callback);
    return tabsWrapper;
  };
});

exports.default = tabsWrapper;

},{"./wrap-chrome-api":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapChromeApi;
function wrapChromeApi(context, method) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    context[method].apply(context, params.concat([function (result) {
      var error = chrome.runtime.lastError;
      error ? reject(error) : resolve(result);
    }]));
  });
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dataUrlToImage;
function dataUrlToImage(dataUrl) {
  return new Promise(function (resolve, reject) {
    var img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.src = dataUrl;
  });
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LARGE_IMAGE = exports.LARGE_IMAGE = {
  width: 2560,
  height: 1440,
  path: 'helpers/node.png'
};

var MEDIUM_IMAGE = exports.MEDIUM_IMAGE = {
  width: 580,
  height: 360,
  path: 'helpers/js.jpg'
};

},{}],11:[function(require,module,exports){
'use strict';

var _screenShot = require('../src/screen-shot');

var _screenShot2 = _interopRequireDefault(_screenShot);

var _tabsWrapper = require('../src/utils/tabs-wrapper');

var _tabsWrapper2 = _interopRequireDefault(_tabsWrapper);

var _dataurlToImage = require('./helpers/dataurl-to-image');

var _dataurlToImage2 = _interopRequireDefault(_dataurlToImage);

var _testImages = require('./helpers/test-images');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ScreenShot tests', function () {
  var captureStab = null;

  beforeEach(function () {
    captureStab = sinon.stub(_tabsWrapper2.default, 'capture');
  });

  afterEach(function () {
    captureStab.restore();
  });

  describe('Tests for large image', function () {
    it('should perform capture | resize | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.LARGE_IMAGE.path));

      new _screenShot2.default().resize({ width: 100, height: 200 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(100);
        expect(img.height).to.equal(200);

        done();
      });
    });

    it('should perform capture | crop | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.LARGE_IMAGE.path));

      new _screenShot2.default().crop({ x: 100, y: 200, width: 1000, height: 1000 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(1000);
        expect(img.height).to.equal(1000);

        done();
      });
    });

    it('should perform capture | crop | resize | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.LARGE_IMAGE.path));

      new _screenShot2.default().crop({ x: 100, y: 200, width: 1000, height: 1000 }).resize({ width: 100, height: 200 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(100);
        expect(img.height).to.equal(200);

        done();
      });
    });
  });

  describe('Tests for medium image', function () {
    it('should perform capture | resize | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.MEDIUM_IMAGE.path));

      new _screenShot2.default().resize({ width: 100, height: 200 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(100);
        expect(img.height).to.equal(200);

        done();
      });
    });

    it('should perform capture | crop | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.MEDIUM_IMAGE.path));

      new _screenShot2.default().crop({ x: 100, y: 200, width: 100, height: 100 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(100);
        expect(img.height).to.equal(100);

        done();
      });
    });

    it('should perform capture | crop | resize | getDataUrl', function (done) {
      captureStab.returns(Promise.resolve(_testImages.MEDIUM_IMAGE.path));

      new _screenShot2.default().crop({ x: 100, y: 200, width: 100, height: 100 }).resize({ width: 150, height: 200 }).getDataUrl().then(_dataurlToImage2.default).then(function (img) {
        expect(captureStab.calledOnce).to.be.true;
        expect(img.width).to.equal(150);
        expect(img.height).to.equal(200);

        done();
      });
    });
  });
});

},{"../src/screen-shot":2,"../src/utils/tabs-wrapper":7,"./helpers/dataurl-to-image":9,"./helpers/test-images":10}],12:[function(require,module,exports){
'use strict';

var _crop = require('../../src/utils/crop');

var _crop2 = _interopRequireDefault(_crop);

var _dataurlToImage = require('../helpers/dataurl-to-image');

var _dataurlToImage2 = _interopRequireDefault(_dataurlToImage);

var _testImages = require('../helpers/test-images');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Crop tests', function () {
  it('should crop image to 60x50 (positions x = 10, y = 10)', function (done) {
    (0, _crop2.default)(_testImages.LARGE_IMAGE.path, { x: 10, y: 10, width: 60, height: 50 }).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(60);
      expect(img.height).to.equal(50);

      done();
    });
  });

  it('should crop image (positions x = 100, y = 200)', function (done) {
    (0, _crop2.default)(_testImages.LARGE_IMAGE.path, { x: 100, y: 200 }).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(_testImages.LARGE_IMAGE.width - 100);
      expect(img.height).to.equal(_testImages.LARGE_IMAGE.height - 200);

      done();
    });
  });

  it('should crop image empty opts', function (done) {
    (0, _crop2.default)(_testImages.LARGE_IMAGE.path, {}).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(_testImages.LARGE_IMAGE.width);
      expect(img.height).to.equal(_testImages.LARGE_IMAGE.height);

      done();
    });
  });
});

},{"../../src/utils/crop":3,"../helpers/dataurl-to-image":9,"../helpers/test-images":10}],13:[function(require,module,exports){
'use strict';

var _objectUtils = require('../../src/utils/object-utils');

var _objectUtils2 = _interopRequireDefault(_objectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Object utils tests', function () {
  var obj = {
    x: 1,
    y: 2,
    z: 3
  };

  describe('contains', function () {
    it('should return true', function () {
      var result = _objectUtils2.default.contains(obj, ['x', 'y', 'z']);

      expect(result).to.be.true;
    });

    it('should return false', function () {
      var result = _objectUtils2.default.contains(obj, ['x', 'y', 'z', 'c']);

      expect(result).to.be.false;
    });
  });

  describe('notContains', function () {
    it('should return true', function () {
      var result = _objectUtils2.default.notContains(obj, ['a', 'b', 'c']);

      expect(result).to.be.true;
    });

    it('should return false', function () {
      var result = _objectUtils2.default.notContains(obj, ['x', 'b', 'c']);

      expect(result).to.be.false;
    });
  });

  describe('containsAtLeastOne', function () {
    it('should return true', function () {
      var result = _objectUtils2.default.containsAtLeastOne(obj, ['a', 'b', 'x']);

      expect(result).to.be.true;
    });

    it('should return false', function () {
      var result = _objectUtils2.default.containsAtLeastOne(obj, ['a', 'b', 'c']);

      expect(result).to.be.false;
    });
  });
});

},{"../../src/utils/object-utils":4}],14:[function(require,module,exports){
'use strict';

var _resize = require('../../src/utils/resize');

var _resize2 = _interopRequireDefault(_resize);

var _dataurlToImage = require('../helpers/dataurl-to-image');

var _dataurlToImage2 = _interopRequireDefault(_dataurlToImage);

var _testImages = require('../helpers/test-images');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Resize tests', function () {
  it('should resize image to 200x150', function (done) {
    (0, _resize2.default)(_testImages.LARGE_IMAGE.path, { width: 200, height: 150 }).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(200);
      expect(img.height).to.equal(150);

      done();
    });
  });

  it('should resize image without opts width', function (done) {
    (0, _resize2.default)(_testImages.LARGE_IMAGE.path, { height: 150 }).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(_testImages.LARGE_IMAGE.width);
      expect(img.height).to.equal(150);

      done();
    });
  });

  it('should resize image without opts height', function (done) {
    (0, _resize2.default)(_testImages.LARGE_IMAGE.path, { width: 150 }).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(150);
      expect(img.height).to.equal(_testImages.LARGE_IMAGE.height);

      done();
    });
  });

  it('should not resize image', function (done) {
    (0, _resize2.default)(_testImages.LARGE_IMAGE.path, {}).then(_dataurlToImage2.default).then(function (img) {
      expect(img.width).to.equal(_testImages.LARGE_IMAGE.width);
      expect(img.height).to.equal(_testImages.LARGE_IMAGE.height);

      done();
    });
  });
});

},{"../../src/utils/resize":5,"../helpers/dataurl-to-image":9,"../helpers/test-images":10}]},{},[1]);
