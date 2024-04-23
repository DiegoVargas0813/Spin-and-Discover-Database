/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('arroja', t => {
        t.primary(['idtag','idbusqueda']);

        t.integer('idtag').unsigned().notNull();
        t.foreign('idtag').references('idtag').inTable('tag');

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