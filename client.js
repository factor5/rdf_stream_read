const axios = require('axios');
const N3 = require('n3');
const streamParser = new N3.StreamParser();

axios.get('http://localhost:3000/', {
    responseType: 'stream'
}).then((response) => {
    const rdfStream = response.data;
    rdfStream.pipe(streamParser);
    streamParser.pipe(new SlowConsumer());
});

function SlowConsumer() {
  const writer = new require('stream').Writable({ objectMode: true });
  writer._write = (quad, encoding, done) => {
    console.log(quad);
    setTimeout(done, 500);
  };
  return writer;
}