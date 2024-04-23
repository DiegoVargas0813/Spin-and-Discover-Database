const express = require('express');
const toolsRouter = express.Router();
const toolsModel = require('./models/tool');


const validateQueryParams = (req, res, next) => {
    const toolAttributes = req.query;
    if(toolAttributes.nombreHerramienta 
        && toolAttributes.propositoia
        && toolAttributes.subpropositoia
        && toolAttributes.ecosistema 
        && toolAttributes.tipocontenido
        && toolAttributes.descripcion
        && toolAttributes.costo
        && toolAttributes.licencia){
        

        toolAttributes.licencia = toolAttributes.licencia === 'true' ? true : false;

        req.toolAttributes = toolAttributes;
        
        return next();
    }
    const error = new Error('Invalid Request Params');
    error.status = 400;
    next(error);
};

toolsR
outer.param('id', async (req, res, next, id) => {
    const tool = await toolsModel.getToolById(id);
    if (tool !== -1) {
        req.tool = tool;
        req.toolId = id;
        return next();
    }
    const error = new Error(`Tool with id ${id} not found`);
    error.status = 404;
    next(error);
});



toolsRouter.get('/', async (req, res, next) => {
    console.log('get');
    try {
        const dbTools = await toolsModel.getAllTools();
        res.send(dbTools);
    } catch (e) {
        const error = new Error(`Database error occurred: ${e.message}`);
        next(error);
    }
});

toolsRouter.get('/:id', (req, res, next) => {
    return res.send(req.tool);
});

toolsRouter.put('/:id', validateQueryParams, async (req, res, next) => {
    const updatedTool = await toolsModel.updateTool(req.toolId, req.toolAttributes);
    res.send(updatedTool);
});
  
toolsRouter.post('/', validateQueryParams, async (req, res, next) => {
    console.log(req.body);
    const newTool = await toolsModel.createTool(req.toolAttributes);
    res.status(201).send(newTool);
});

toolsRouter.delete('/:id', async(req,res,next) => {
    const deletedTool = await toolsModel.deleteTool(req.toolId);
    res.send(deletedTool);
})

const errorHandler = (err, req, res, next) => {
    console.log('error');
    const status = err.status || 500;
    res.status(status).send(err.message);
}

toolsRouter.use(errorHandler);

module.exports = toolsRouter;