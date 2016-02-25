import objectUtils from './object-utils';

export default function crop(src, opts = {}) {
  const isWithoutProps = objectUtils.notContains(opts, ['x', 'y', 'width', 'height']);

  if (isWithoutProps) {
    return Promise.resolve(src);
  }

  const {x, y, width, height} = opts;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      const sX = x || 0;
      const sY = y || 0;
      const sWidth = width || image.width - sX;
      const sHeight = height || image.height - sY;

      canvas.width = sWidth;
      canvas.height = sHeight;

      context.drawImage(image, sX, sY, sWidth, sHeight, 0, 0, sWidth, sHeight);

      resolve(canvas.toDataURL());
    };

    image.src = src;
  });
};
