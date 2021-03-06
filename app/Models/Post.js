"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  static get hidden() {
    return ["created_at", "updated_at"];
  }
}

module.exports = Post;
