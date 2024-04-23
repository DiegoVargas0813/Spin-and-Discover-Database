/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('consulta', t => {
        t.primary(['iduser','idherramienta']);

        t.integer('iduser').unsigned().notNull();
        t.foreign('iduser').references('iduser').inTable('usuario');

        t.integer('idherramienta').unsigned().notNull();
        t.foreign('idherramienta').references('idherramienta').inTable('herramienta_ia');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('consulta');
};
