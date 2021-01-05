"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Post = use("App/Models/Post");
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const posts = await Post.all();
    return posts;
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const { title, content } = request.all();

      const post = await Post.create({
        title,
        content,
        user_id: auth.user.id,
      });

      await post.load("user");
      return response.status(201).send(post);
    } catch (error) {
      return response.status(error.status).send({
        message: "Erro ao salvar post",
        error: {
          error: error,
          status: error.status,
          message: error.messages,
        },
      });
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    try {
      const post = await Post.findByOrFail(id);

      await post.delete();

      return response.status(204).send();
    } catch (error) {
      return response.status(error.status).send({
        message: "Erro ao excluir post",
        error: {
          error: error,
          status: error.status,
          message: error.messages,
        },
      });
    }
  }
}

module.exports = PostController;
