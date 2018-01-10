'use strict';

const Controller = require('egg').Controller;

class HireOutsideProjectsController extends Controller {

  async getListWithPage() {
    const { ctx, service } = this;
    const page = ctx.request.query.page;
    const limit = ctx.request.query.limit;
    const price_range = ctx.request.query.price_range;
    const sender = ctx.request.query.sender;
    const result = await service.hireoutsideprojects.getListWithPage(page, limit, price_range, sender);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.hireoutsideprojects.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
        name: { type: 'string', required: true },            
    });
    const result = await service.hireoutsideprojects.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },      
    });
    const result = await service.hireoutsideprojects.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.hireoutsideprojects.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = HireOutsideProjectsController;
