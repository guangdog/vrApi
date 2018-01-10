'use strict';

const Service = require('egg').Service;

class BookDetailsService extends Service {

  // 获取所有数据
  async getList() {
    const result = await this.app.mysql.select('book_details', {
      orders: [[ 'id', 'desc' ]], // 排序方式
    });
    return { data: result };
  }

 // 分页获取数据
 async getListWithPage(page, pageSize, category_id,book_name) {
  let result = null;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;
  let count = 0;
  if (book_name){
    // 获取总条数
   let sql = "SELECT count(id) as totalCount FROM book_details where  category_id="+  category_id +" and book_name like '%"+ book_name +"%' ";
  count = await this.app.mysql.query(sql);
  // 根据分类
  sql = " select * from book_details where category_id="+  category_id +" and book_name  like '%"+book_name +"%' limit " + offset + ',' + limit;
    result = await this.app.mysql.query(sql);

  }
  else{
  // 获取总条数
  count = await this.app.mysql.query('SELECT count(id) as totalCount FROM book_details where category_id='+category_id);
  // 根据分类
  
    result = await this.app.mysql.select('book_details', {
      where:{category_id:category_id},
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
  } 
 
  return { count: count.length > 0 ? count[0].totalCount : 0, msg: '', code: '', data: result };
}

  // 根据用户id查询数据
  async findByID(id) {
    const result = await this.app.mysql.get('book_details', { id });
    return { data: result };
  }

  // 新增的数据
  async addModel(data) {
    const { ctx, app } = this;
    data.createtime = ctx.helper.currentDateTime();
    // 新增数据
    const result = await app.mysql.insert('book_details', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async updateModel(data) {
    // 修改数据，将会根据主键 ID 查找，并更新
    const { ctx, app } = this;
    data.createtime = ctx.helper.currentDateTime();
    const result = await app.mysql.update('book_details', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('book_details', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = BookDetailsService;
