'use strict';

const Service = require('egg').Service;

class HireProvincesService extends Service{
    // 获取所有数据
    async getList(limit) {
        let result = null;
        if(limit){
          const sql = " select * from hire_provinces LIMIT "+ limit;
          result = await this.app.mysql.query(sql);
        }else{
          result = await this.app.mysql.select('hire_provinces', {
            orders: [[ 'id', 'desc' ]], // 排序方式
          });
        }
         
        return { data: result };
      }

  // 根据用户id查询数据
  async findByID(id) {
    const result = await this.app.mysql.get('hire_provinces', { id });
    return { data: result };
  }

  // 新增的数据
  async addModel(data) {
    const { ctx, app } = this;
   data.create_time = ctx.helper.currentDateTime();
    // 新增数据
    const result = await app.mysql.insert('hire_provinces', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async updateModel(data) {
    // 修改数据，将会根据主键 ID 查找，并更新
    const { ctx, app } = this;
    //data.createtime = ctx.helper.currentDateTime();
    const result = await app.mysql.update('hire_provinces', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('hire_provinces', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = HireProvincesService;