'use strict';

const Service = require('egg').Service;

class OpenCoursesService extends Service {
  // 分页获取数据
  async getListWithPage(page, pageSize, category_id, name) {
    let result = null;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;
    let count = 0;

    if (category_id && !name){
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM open_courses where category_id = "+ category_id;
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " SELECT * FROM open_courses where category_id "+ category_id +" limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);

    }
    else if (!category_id && name) {
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM open_courses where name like '%"+ name +"%' ";
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " select * from open_courses where name like '%"+ name +"%' limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);

    }
    else if (category_id && name) {
      // 获取总条数
    let sql = "SELECT count(id) as totalCount FROM open_courses where category_id ="+ category_id +" and name like '%"+ name +"%' ";
    count = await this.app.mysql.query(sql);
    // 根据分类
    sql = " SELECT * FROM open_courses where category_id ="+ category_id +" and name like '%"+ name +"%' limit " + offset + ',' + limit;
      result = await this.app.mysql.query(sql);
   	
    }
    else{
      // 获取总条数
    count = await this.app.mysql.query('SELECT count(id) as totalCount FROM open_courses');
    // 根据分类  
      result = await this.app.mysql.select('open_courses', {
        orders: [[ 'id', 'desc' ]], // 排序方式
        limit, // 返回数据量
        offset, // 数据偏移量
      });
    }
  
    return { count: count.length > 0 ? count[0].totalCount : 0, msg: '', code: '', data: result };
  }
}

module.exports = OpenCoursesService;