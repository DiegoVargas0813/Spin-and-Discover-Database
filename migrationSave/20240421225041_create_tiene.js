/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tiene', t => {
        t.primary(['idproposito','idherramienta']);

        t.integer('idproposito').unsigned().notNull();
        t.foreign('idproposito').references('idproposito').inTable('proposito_ia');

        t.integer('idherramienta').unsigned().notNull();
        t.foreign('idherramienta').references('idherramienta').inTable('herramienta_ia');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tiene');
};
