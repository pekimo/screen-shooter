export default function wrapChromeApi(context, method, ...params) {
  return new Promise((resolve, reject) => {
    context[method](...params, result => {
      let error = chrome.runtime.lastError;
      error ? reject(error) : resolve(result);
    });
  });
}
