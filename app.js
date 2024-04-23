const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const toolsRouter = require('./tools.js');

const app = express();


// Serves Express Yourself website
app.use(express.static('public'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use('/tools', toolsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
