import objectUtils from './object-utils';

export default function resize(src, opts = {}) {
  const isWithoutProps = objectUtils.notContains(opts, ['width', 'height']);

  if (isWithoutProps) {
    return Promise.resolve(src);
  }

  const {width, height} = opts;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      const resizeWidth = width || image.width;
      const resizeHeight = height || image.height;

      canvas.width = resizeWidth;
      canvas.height = resizeHeight;

      context.drawImage(image, 0, 0, resizeWidth, resizeHeight);

      resolve(canvas.toDataURL());
    };

    image.src = src;
  });
};
