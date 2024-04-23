/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('herramienta_ia', t => {
    t.increments('idherramienta').unsigned().primary();
    t.text('nombreherramienta').notNull();
    t.text('ecosistema').notNull();
    t.text('descripcion').notNull();
    t.integer('costo').notNull();
    t.boolean('licencia').notNull();
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