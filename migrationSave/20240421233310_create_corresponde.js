/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('corresponde', t => {
        t.primary(['idtag','idherramienta']);

        t.integer('idtag').unsigned().notNull();
        t.foreign('idtag').references('idtag').inTable('tag');

        t.integer('idherramienta').unsigned().notNull();
        t.foreign('idherramienta').references('idherramienta').inTable('herramienta_ia');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('corresponde');
};
