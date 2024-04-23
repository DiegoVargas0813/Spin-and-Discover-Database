const db = require('../db');

const getAllTools = async () => {
    const result = await db.query('SELECT * FROM herramienta_ia');
    return result.rows;
};

const getToolById = async (id) => {
    const count = await db.query('SELECT COUNT(*) FROM herramienta_ia WHERE idherramienta = $1', [id]);
    if(count.rows[0].count === '0'){
        return -1;
    }
    const result = await db.query('SELECT * FROM herramienta_ia WHERE idherramienta = $1', [id]);
    return result.rows[0];
};

const createTool = async (toolAttributes) => {
    const result = await db.query('INSERT INTO herramienta_ia (nombreherramienta, propositoia, subpropositoia, ecosistema, tipocontenido, descripcion, costo, licencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [toolAttributes.nombreHerramienta, toolAttributes.propositoia, toolAttributes.subpropositoia, toolAttributes.ecosistema, toolAttributes.tipocontenido, toolAttributes.descripcion, toolAttributes.costo, toolAttributes.licencia]);
    return result.rows[0];
};

const updateTool = async (id, toolAttributes) => {
    const result = await db.query('UPDATE herramienta_ia SET nombreherramienta = $1, propositoia = $2, subpropositoia = $3, ecosistema = $4, tipocontenido = $5, descripcion = $6, costo = $7, licencia = $8 WHERE idherramienta = $9 RETURNING *', [toolAttributes.nombreHerramienta, toolAttributes.propositoia, toolAttributes.subpropositoia, toolAttributes.ecosistema, toolAttributes.tipocontenido, toolAttributes.descripcion, toolAttributes.costo, toolAttributes.licencia, id]);
    return result.rows[0];
};

const deleteTool = async (id) => {
    const result = await db.query('DELETE FROM herramienta_ia WHERE idherramienta = $1 RETURNING *', [id]);
    return result.rows[0];
};

const getByCondition = async (category, value) => {
        
        result = await db.query(`SELECT * FROM herramienta_ia WHERE ${category} = $1`,[value]);
        return result.rows;
};

const getByConditionPurpose =  async (value) => {
        result = await db.query(`SELECT * FROM herramienta_ia WHERE propositoia = $1 or subpropositoia = $1`,[value]);
        return result.rows;
};

module.exports = {
    getAllTools,
    getToolById,
    createTool,
    updateTool,
    deleteTool,
    getByCondition,
    getByConditionPurpose
}