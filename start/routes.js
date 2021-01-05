"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

/**
 * Users
 */
Route.post("/users", "UserController.store");
Route.get("/users", "UserController.index");

/**
 * Session
 */
Route.post("/session", "SessionController.login");

/**
 * Posts
 */
Route.post("/posts", "PostController.store").middleware("auth");
Route.get("/posts", "PostController.index");
Route.delete("/posts/:id", "PostController.destroy");
