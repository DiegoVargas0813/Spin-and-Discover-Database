/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('arroja', t => {
        t.primary(['idherramienta','idbusqueda']);

        t.integer('idherramienta').unsigned().notNull();
        t.foreign('idherramienta').references('idherramienta').inTable('herramienta_ia');

        t.integer('idbusqueda').unsigned().notNull();
        t.foreign('idbusqueda').references('idbusqueda').inTable('busqueda');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('arroja');
};