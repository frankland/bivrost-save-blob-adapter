import fileSaver from 'browser-filesaver';

export default function saveBlobAdapter(adapter, fileNameGetter) {
  return function(url, params) {
    return adapter(url, params)
      .then(response => {
        console.log(response);

        const filename = fileNameGetter(url, params, response);
        if (!filename) {
          throw new Error('Empty file name');
        }

        let blob = new Blob([
          JSON.stringify(response)
        ]);
        fileSaver.saveAs(blob, filename);

        return response;
      });
  }
};
