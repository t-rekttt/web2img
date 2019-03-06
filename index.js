const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const screenshot = require('./screenshot.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/screenshot', async(req, res) => {
  if (req.query && req.query.url) {
    let { url, browserOptions, pageOptions } = req.query;
    let img = await screenshot(url, browserOptions ? JSON.parse(browserOptions) : null, pageOptions ? JSON.parse(pageOptions) : '');
    res.send(img);
  }
});

let PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log('Listening on port '+PORT);
});