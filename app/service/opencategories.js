'use strict';

const Service = require('egg').Service;

class OpenCategoriesService extends Service {

  // 获取所有数据
  async getlist(parent_id) {
    let result = null;
	if (parent_id) {
      const sql = " select * from open_categories where parent_id = "+ parent_id + " order by id desc";
      result = await this.app.mysql.query(sql);
    }
    else{
      result = await this.app.mysql.select('open_categories', {
        orders: [[ 'id', 'desc' ]], // 排序方式
      });
    }
    return { data: result };
  }


}

module.exports = OpenCategoriesService;
