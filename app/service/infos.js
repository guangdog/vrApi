'use strict';

const Service = require('egg').Service;

class InfosService extends Service{
    // 获取所有数据
  async getList(limit) {
    let result = null;
    if(limit){
      const sql = " select * from cms_infos LIMIT "+ limit;
      result = await this.app.mysql.query(sql);
    }else{
      result = await this.app.mysql.select('cms_infos', {
        orders: [[ 'id', 'desc' ]], // 排序方式
      });
    }
     
    return { data: result };
  }

 // 分页获取数据
 async getListWithPage(page, pageSize, category_id) {
  let result = null;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;
  // 获取总条数
  const count = await this.app.mysql.query('SELECT count(id) as totalCount FROM cms_infos');
  // 根据分类
  
    result = await this.app.mysql.select('cms_infos', {
      where:{category_id:category_id},
      orders: [[ 'id', 'desc' ]], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
 
  return { count: count.length > 0 ? count[0].totalCount : 0, msg: '', code: '', data: result };
}

  // 根据用户id查询数据
  async findByID(id) {
    const result = await this.app.mysql.get('cms_infos', { id });
    return { data: result };
  }

  //根据分类ID查询出对应文章
  async findByCateID(cateId,limit){

    let result = null;
    if(limit){
      const sql = " select * from cms_infos where category_id="+ cateId +"   LIMIT "+ limit;
      result = await this.app.mysql.query(sql);
    }else{
      result = await this.app.mysql.get('cms_infos',{category_id:cateId});
    }

   
    return { data: result };
  }

  // 新增的数据
  async addModel(data) {
    const { ctx, app } = this;
   data.created_time = ctx.helper.currentDateTime();
    // 新增数据
    const result = await app.mysql.insert('cms_infos', data);
    return {
      insertId: result.insertId, // 添加返回的ID
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '添加成功' : '添加失败',
    };
  }

  async updateModel(data) {
    // 修改数据，将会根据主键 ID 查找，并更新
    const { ctx, app } = this;
   data.update_time = ctx.helper.currentDateTime();
    const result = await app.mysql.update('cms_infos', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('cms_infos', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = InfosService;