//MAS ACTUALIZADO

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const toolsRouter = require('./tools.js');
const axiostest = require('./apiRequest.js');
const { default: axios } = require('axios');

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

//axiostest.fetchTool(1);
//axiostest.fetchTools();
//axiostest.fetchTool(2);

//axiostest.TagSearch('name','tipo3');

const toolAtributes = {
  nombreHerramienta: 'postNuevo',
  propositoia: 'pROP',
  subpropositoia: 'asdas',
  ecosistema: 'asdasd',
  costo: 'asdas',
  licencia: false,
  imagen : 'logo30',
  link: 'https://cloud.google.com/ai-infrastructure'
}
//axiostest.postTools(toolAtributes);
//axiostest.postTools(toolAtributes);
//axiostest.putTools(10, toolAtributes);
//axiostest.deleteTools(8);
