'use strict';

const Service = require('egg').Service;

class HireOutsideProjectsService extends Service{

  // 分页获取数据
  async getListWithPage(page, pageSize, price_range, sender) {
    let result = null;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    let count = 0;

    if(price_range){
    	let sql = "SELECT * from hire_price_range where id = "+ price_range;
    	let result = await this.app.mysql.query(sql);
    	var min_range = result[0].min_range
    	var max_range = result[0].max_range
    }
    if (price_range && !sender){
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM hire_outside_projects where price between "+  min_range +" and "+ max_range;
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " SELECT * FROM hire_outside_projects where price between "+  min_range +" and "+ max_range +" limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);

    }
    else if (!price_range && sender) {
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM hire_outside_projects where sender ="+ sender;
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " select * from hire_outside_projects where sender="+ sender +" limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);

    }
    else if (price_range && sender) {
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM hire_outside_projects where price between "+  min_range +" and "+ max_range +" and sender ="+ sender;
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " SELECT * FROM hire_outside_projects where price between "+  min_range +" and "+ max_range +" and sender ="+ sender +" limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);
   	
    }
    else{
      // 获取总条数
    count = await this.app.mysql.query('SELECT count(id) as totalCount FROM hire_outside_projects');
    // 根据分类  
      result = await this.app.mysql.select('hire_outside_projects', {
        orders: [[ 'id', 'desc' ]], // 排序方式
        limit, // 返回数据量
        offset, // 数据偏移量
      });
    }
  
    return { count: count.length > 0 ? count[0].totalCount : 0, msg: '', code: '', data: result };
  }
  
  // 根据用户id查询数据
  async findByID(id) {
    const result = await this.app.mysql.get('hire_outside_projects', { id });
    return { data: result };
  }

  // 新增的数据
  async addModel(data) {
    const { ctx, app } = this;
   // data.createtime = ctx.helper.currentDateTime();
    // 新增数据
    const result = await app.mysql.insert('hire_outside_projects', data);
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
    const result = await app.mysql.update('hire_outside_projects', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('hire_outside_projects', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = HireOutsideProjectsService;