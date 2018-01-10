'use strict';

const Controller = require('egg').Controller;

class OpenCoursesController extends Controller {

  async getListWithPage() {
    const { ctx, service } = this;
//  ctx.validate({
//    page: { type: 'int', required: true },
//    limit: { type: 'int', required: true },
//  });
    const page = ctx.request.query.page;
    const limit = ctx.request.query.limit;
    const category_id = ctx.request.query.category_id;
    const name = ctx.request.query.name;
    const result = await service.opencourses.getListWithPage(page, limit, category_id, name);
    ctx.body = result;
    ctx.status = 200;
  }
  
}

module.exports = OpenCoursesController;
