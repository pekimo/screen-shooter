const dataURLToBlob = dataURL => {
  var BASE64_MARKER = ';base64,';

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
};

export default function saveImageBlob(dataUrl) {
  const blob = dataURLToBlob(dataUrl);
  return URL.createObjectURL(blob);
}
