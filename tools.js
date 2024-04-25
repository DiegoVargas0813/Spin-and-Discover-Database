//MAS ACTUALIZADO

const express = require('express');
const toolsRouter = express.Router();
const toolsModel = require('./models/tool');


const validateQueryParams = (req, res, next) => {
    const toolAttributes = req.body;

    if(toolAttributes.nombreHerramienta ){
    
        req.toolAttributes = toolAttributes;
        
        return next();
    }
    const error = new Error('Invalid Request Params');
    console.log('Error de parametros');
    error.status = 400;
    next(error);
};

toolsRouter.param('id', async (req, res, next, id) => {
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

toolsRouter.param('category', async (req,res,next,category) => {
    const endpointToColumn = {
        'name': 'nombreherramienta',
        'purpose': 'propositoia',
        'content': 'tipocontenido',
        'cost': 'costo',
        'license': 'licencia',
        'imagen': 'imagen',
        'link': 'linkherramienta'
    };

    if(['name','purpose','content','cost','license','imagen','linkherramienta']){
        category = endpointToColumn[category];
        req.category = category;
        console.log(req.category);
        return next();
    }
    const error = new Error('Invalid category');
    error.status = 400;
    return next(error);
})

toolsRouter.get('/:category/:value', async (req,res,next) =>{
    const value = req.params.value;
    try{
        if(req.category === 'propositoia'){
            const tagTool = await toolsModel.getByConditionPurpose(value);
            res.send(tagTool);
        }else{
            const tagTool = await toolsModel.getByCondition(req.category, value);
            res.send(tagTool);  
        }

    } catch (e) {
        const error = new Error(`Invalid parameters`);
        error.status = 400;
        next(error);
    }
})

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
    const newTool = await toolsModel.createTool(req.toolAttributes);
    res.status(201).send(newTool);
});

toolsRouter.delete('/:id', async(req,res,next) => {
    const deletedTool = await toolsModel.deleteTool(req.toolId);
    res.send(deletedTool);
})

const errorHandler = (err, req, res, next) => {
    console.log(`error ${err.status}`);
    const status = err.status || 500;
    res.status(status).send(err.message);
}

toolsRouter.use(errorHandler);

module.exports = toolsRouter;