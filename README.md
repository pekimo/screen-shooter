Screen-shooter
===============

Screen-shooter is lib for chrome extensions.

## Dependencies
Chrome api package "tabs". More info [here](https://developer.chrome.com/extensions/tabs).

## Installation
```js
npm i --save-dev git+https://github.com/salting/screen-shooter.git
```

## Usage

```js
import screenShooter form 'screen-shooter';

screenShooter
    .capture()
    .crop({x: 10, y: 10, width: 100, height: 100})
    .resize({width: 1000, height: 600})
    .getDataUrl()
    .then(dataUrl => {
        console.log('DataUrl', dataUrl);
    });
```
## API

Capture;
---
Make captureVisibleTabs (PNG). More info [here](https://developer.chrome.com/extensions/tabs#method-captureVisibleTab).
Тo get the screenshot you need to select the format of data (dataUrl of blobUrl).
```js
screenShooter
    .capture()
    .getDataUrl() // or .getBlobUrl()
    .then(dataUrl => {
        console.log(dataUrl);
    });
```

Resize
---
```js
/**
 * Resize image to specified dimensions.
 * @param {string} src
 * @param {object} opts
 * @description
 * src - url of dataUrl of image
 * opts = {
 *      [width]: Number - destination width,
 *      [height]: Number - destination height
 * }
 * @return {string} dataUrl resized image
 */

const image = 'http://lorempixel.com/1000/1000';
const resizedImage = screenShooter.resize(image, {width: 100, height: 200});
```

Crop
---
```js
/**
 * Resize image to specified dimensions.
 * @param {string} src
 * @param {object} opts
 * @description
 * src - url of dataUrl of image
 * opts = {
 *      [x]: Number - the x coordinate where to start clipping
 *      [y]: Number - the y coordinate where to start clipping
 *      [width]: Number - the width of the clipped image
 *      [height]: Number - the heigth of the clipped image
 * }
 * @return {string} dataUrl resized image
 */

const image = 'http://lorempixel.com/1000/1000';
const resizedImage = screenShooter.crop(image, {x: 50, y: 150, width: 100, height: 200});
```
