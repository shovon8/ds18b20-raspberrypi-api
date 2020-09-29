let express = require('express');
let fs = require('fs');

let server = express();

const PORT = 8080;
const WEBROOT = './public';

server.get('/', express.static(WEBROOT));

server.get('/temperature', (req, res) => {
  let tempDataPath = '/sys/bus/w1/devices/28-00000ba693e9/temperature';
  let temperature = fs.readFileSync(tempDataPath, {encoding: 'utf8', flag: 'r'}) / 1000;
  res.json({temperature, rangeStart: -55, rangeEnd: 125});
});

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

