/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('genera', t => {
        t.primary(['idcontent','idherramienta']);

        t.integer('idcontent').unsigned().notNull();
        t.foreign('idcontent').references('idcontent').inTable('tipo_contenido');

        t.integer('idherramienta').unsigned().notNull();
        t.foreign('idherramienta').references('idherramienta').inTable('herramienta_ia');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('genera');
};
