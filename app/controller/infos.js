'use strict';

const Controller = require('egg').Controller;

class InfosController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const limit = ctx.request.query.limit;
    const result = await service.infos.getList(limit);
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
    const result = await service.infos.getListWithPage(page, limit, category_id);
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.infos.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }
  async findBycate(){
    const {ctx,service } =this;
     // get请求获取的参数ctx.request.query
     const cateId = ctx.request.query.cateId;
     const limit = ctx.request.query.limit;
     const result = await service.infos.findByCateID(cateId,limit);
     ctx.body = result;
     ctx.status = 200;
  }
  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      title: { type: 'string', required: true },
      category_id: { type: 'string', required: true },        
    });
    const result = await service.infos.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      title: { type: 'string', required: true },
      category_id: { type: 'string', required: true },     
    });
    const result = await service.infos.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.infos.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = InfosController;
