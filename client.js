const axios = require('axios');
const httpAdapter = require('axios/lib/adapters/http');
const N3 = require('n3');
const streamParser = new N3.StreamParser();

axios.get('http://localhost:3000/', {
    responseType: 'stream', 
    adapter: httpAdapter
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