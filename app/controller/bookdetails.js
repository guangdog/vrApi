'use strict';

const Controller = require('egg').Controller;

class BookDetailsController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const result = await service.bookdetails.getList();
    ctx.body = result;
    ctx.status = 200;
  }

  async getListWithPage() {
    const { ctx, service } = this;
    // ctx.validate({
    //   page: { type: 'int', required: true },
    //   limit: { type: 'int', required: true },
    // });
    // get请求获取的参数ctx.request.query
    const page = ctx.request.query.page;
    const limit = ctx.request.query.limit;
    const category_id = ctx.request.query.category_id;
    const book_name = ctx.request.query.book_name;
    const result = await service.bookdetails.getListWithPage(page, limit, category_id,book_name);
    ctx.body = result;
    ctx.status = 200;
  }


  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.bookdetails.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
        book_name: { type: 'string', required: true },
        category_id: { type: 'string', required: true },     
    });
    const result = await service.bookdetails.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      book_name: { type: 'string', required: true },
      category_id: { type: 'string', required: true },
     
    });
    const result = await service.bookdetails.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.bookdetails.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = BookDetailsController;
