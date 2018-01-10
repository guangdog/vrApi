'use strict';

const Controller = require('egg').Controller;

class HomeAdsController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const result = await service.homeads.getList();
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.homeads.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
        tooltip: { type: 'string', required: true },
        url: { type: 'string', required: true },     
    });
    const result = await service.homeads.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      tooltip: { type: 'string', required: true },
      url: { type: 'string', required: true },      
    });
    const result = await service.homeads.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.homeads.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = HomeAdsController;
