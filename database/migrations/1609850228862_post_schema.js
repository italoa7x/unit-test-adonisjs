"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
  up() {
    this.create("posts", (table) => {
      table.increments();
      table.timestamps();
      table.integer("user_id").unsigned().references("id").inTable("users");

      table.string("title");
      table.text("content");
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostSchema;
