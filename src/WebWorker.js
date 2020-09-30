export const processFiles = (fileList) =>
  new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { type: "module" });

    worker.onmessage = ({ data }) => {
      if (data.success) {
        resolve(data.result);
      } else {
        reject(data.error);
      }

      worker.terminate();
    };

    worker.postMessage({ fileList });
  });
