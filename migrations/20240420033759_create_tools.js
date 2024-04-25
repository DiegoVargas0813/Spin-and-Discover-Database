/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('herramienta_ia', t => {
    t.increments('idherramienta').unsigned().primary();
    t.text('nombreherramienta').notNull();
    t.text('propositoia');
    t.text('subpropositoia');
    t.text('ecosistema');
    t.text('tipocontenido');
    t.text('descripcion');
    t.text('costo');
    t.boolean('licencia');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('herramienta_ia');
};

//reference https://knexjs.org/guide/schema-builder.html#hastable