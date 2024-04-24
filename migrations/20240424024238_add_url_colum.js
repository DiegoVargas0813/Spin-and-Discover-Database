/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('herramienta_ia', function(table) {
        // Add a new column
        table.text('linkherramienta');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('herramienta_ia', function(table) {
        // Drop the previously added column
        table.dropColumn('linkherramienta');
    });
};
