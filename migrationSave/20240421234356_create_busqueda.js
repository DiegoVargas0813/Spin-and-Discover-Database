/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('busqueda', t => {
    t.increments('idbusqueda').unsigned().primary();
    t.integer('iduser').notNull();
    t.foreign('iduser').references('iduser').inTable('usuario');
    t.integer('horabusqueda').notNull();
    t.text('terminobusqueda').notNull();
    t.date('fechabusqueda').notNull();
    t.text('filtroutilizado').notNull();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('busqueda');
};
