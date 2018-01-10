'use strict';

const Service = require('egg').Service;

class BbsInfosService extends Service {

  // 获取所有数据
  async getList(limit,byCreateTime,byUpdateTime) {
    let result =null;
    if (limit && !byCreateTime && !byUpdateTime){
      const sql = " select * from bbs_infos order by id desc LIMIT "+ limit;
      result = await this.app.mysql.query(sql);
    }
    else if(limit && byCreateTime && !byUpdateTime){
    	console.log('1')
    	const sql = " select * from bbs_infos order by create_time desc LIMIT "+ limit;
      result = await this.app.mysql.query(sql);
    }
    else if(limit && !byCreateTime &&  byUpdateTime){
    	const sql = " select * from bbs_infos order by update_time desc LIMIT "+ limit;
      result = await this.app.mysql.query(sql);
    }
    else{
      result = await this.app.mysql.select('bbs_infos', {
        orders: [[ 'id', 'desc' ]], // 排序方式
      });
    }
   
    return { data: result };
  }

// 帖子按照分类，标题模糊查询
async getListWithPage(page, pageSize, category_id,title) {
  let result = null;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;
  let count = 0;
  if (title){
    // 获取总条数
   let sql = "SELECT count(id) as totalCount FROM bbs_infos where  category_id="+  category_id +" and title like '%"+ title +"%' ";
  count = await this.app.mysql.query(sql);
  // 根据分类
  sql = " select * from bbs_infos where category_id="+  category_id +" and title  like '%"+title +"%' limit " + offset + ',' + limit;
    result = await this.app.mysql.query(sql);

  }
  else{
  // 获取总条数
  count = await this.app.mysql.query('SELECT count(id) as totalCount FROM bbs_infos where category_id='+category_id);
  // 根据分类  
    result = await this.app.mysql.select('bbs_infos', {
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
    const result = await this.app.mysql.get('bbs_infos', { id });
    return { data: result };
  }

  // 新增的数据
  async addModel(data) {
    const { ctx, app } = this;
    data.create_time = ctx.helper.currentDateTime();
    // 新增数据
    const result = await app.mysql.insert('bbs_infos', data);
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
    const result = await app.mysql.update('bbs_infos', data);
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '修改成功' : '修改失败',
    };
  }

  // 根据id删除数据
  async destroyModel(id) {
    const result = await this.app.mysql.delete('bbs_infos', { id });
    return {
      error_code: result.affectedRows > 0 ? 0 : 1,
      msg: result.affectedRows > 0 ? '删除成功' : '删除失败',
    };
  }

}

module.exports = BbsInfosService;
