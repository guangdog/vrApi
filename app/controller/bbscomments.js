'use strict';

const Controller = require('egg').Controller;

class BbsCommentsController extends Controller {
  async list() {
    // ctx, service属性挂在 this
    const { ctx, service } = this;
    const result = await service.bbscomments.getList();
    ctx.body = result;
    ctx.status = 200;
  }

  async find() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const id = ctx.request.query.id;
    const result = await service.bbscomments.findByID(id);
    ctx.body = result;
    ctx.status = 200;
  }

  async findByInfoId() {
    const { ctx, service } = this;
    // get请求获取的参数ctx.request.query
    const info_id = ctx.request.query.info_id;
    const result = await service.bbscomments.findByInfoId(info_id);
    ctx.body = result;
    ctx.status = 200;
  }

  async add() {
    const { ctx, service } = this;
    // 验证提交的参数
//    ctx.validate({
//      info_id: { type: 'int', required: true },   
//      content: { type: 'string', required: true },
//      creater_id: { type: 'int', required: true },          
//    });
    const result = await service.bbscomments.addModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    // 验证提交的参数
    ctx.validate({
      id: { type: 'string', required: true },
      info_id: { type: 'int', required: true },   
      content: { type: 'string', required: true },       
    });
    const result = await service.bbscomments.updateModel(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const id = ctx.request.body.id;
    const result = await service.bbscomments.destroyModel(id);
    ctx.body = result;
    ctx.status = 200;
  }

}

module.exports = BbsCommentsController;
