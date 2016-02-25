export default function dataUrlToImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };
        
    img.src = dataUrl;
  });
};
