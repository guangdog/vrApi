'use strict';

const Controller = require('egg').Controller;

class BookCategoriesController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const parent_id = ctx.request.query.parent_id;
    const result = await service.bookcategories.getList(parent_id);
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.bookcategories.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      category_name: { type: 'string', required: true },
      parent_id: { type: 'string', required: true },        
    });
    const result = await service.bookcategories.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      category_name: { type: 'string', required: true },
      parent_id: { type: 'string', required: true },     
    });
    const result = await service.bookcategories.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.bookcategories.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = BookCategoriesController;
