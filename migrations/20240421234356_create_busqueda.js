/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('busqueda', t => {
    t.increments('idbusqueda').unsigned().primary();
    t.time('horabusqueda').notNull();
    t.text('terminobusqueda');
    t.date('fechabusqueda').notNull();
    t.text('filtroutilizado');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('busqueda');
};
