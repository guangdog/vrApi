'use strict';

const Controller = require('egg').Controller;

class OpenCategoriesController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const parent_id = ctx.request.query.parent_id;
    const result = await service.opencategories.getlist(parent_id);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = OpenCategoriesController;
