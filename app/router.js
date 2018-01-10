'use strict';

// 路由
module.exports = app => {
  const { router, controller } = app;
  app.get('/', app.controller.home.index);
  app.get('/demo', app.controller.home.demo);
  // 登录接口
  router.post('/login/login', controller.login.login);
  // 根据手机号发送验证码
  //router.post('/login/sendCode', controller.login.sendCode);
  // // 手机号码注册用户
  // router.post('/login/regWithPhone', controller.login.regWithPhone);
  // // 根据手机号码登录
  // router.post('/login/LoginByPhone', controller.login.LoginByPhone);
  // 邮箱注册用户
  router.post('/login/regWithEmail', controller.login.regWithEmail);
  // 根据邮箱登录
  router.post('/login/LoginByEmail', controller.login.LoginByEmail);
  // 用户名注册用户
  router.post('/login/regUser', controller.login.regUser);
  // 用户根据用户名登录
  router.post('/login/LoginByName', controller.login.LoginByName);
  // // 根据手机号码找回密码
  // router.post('/login/findPasswordByPhone', controller.login.findPasswordByPhone);
  // // 根据手机号码设置新密码
  // router.post('/login/newPasswordByPhone', controller.login.setPasswordWithPhone);

  // 用户的路由信息
  router.get('/user/list', controller.user.list);
  router.get('/user/info', controller.user.userInfo);
  router.get('/user/listByPage', controller.user.getListWithPage);
  router.get('/user/getUserById', controller.user.find);
  router.post('/user/add', controller.user.add);
  router.post('/user/update', controller.user.update);
  router.post('/user/delete', controller.user.destroy);

//分类信息表
router.get('/categories/list',controller.categories.list);
router.get('/categories/getById', controller.categories.find);
router.post('/categories/add', controller.categories.add);
router.post('/categories/update', controller.categories.update);
router.post('/categories/delete', controller.categories.destroy);

//资讯信息表
router.get('/infos/list',controller.infos.list);
router.get('/infos/getById', controller.infos.find);
router.get('/infos/getByCateId', controller.infos.findBycate);
router.post('/infos/add', controller.infos.add);
router.post('/infos/update', controller.infos.update);
router.post('/infos/delete', controller.infos.destroy);
router.get('/infos/listByPage', controller.infos.getListWithPage);


//企业表
router.get('/hirecompanies/list',controller.hirecompanies.list);
router.get('/hirecompanies/getById', controller.hirecompanies.find);
router.post('/hirecompanies/add', controller.hirecompanies.add);
router.post('/hirecompanies/update', controller.hirecompanies.update);
router.post('/hirecompanies/delete', controller.hirecompanies.destroy);

//职位列表
router.get('/hirejobs/list',controller.hirejobs.list);
router.get('/hirejobs/getById', controller.hirejobs.find);
router.post('/hirejobs/add', controller.hirejobs.add);
router.post('/hirejobs/update', controller.hirejobs.update);
router.post('/hirejobs/delete', controller.hirejobs.destroy);

//项目发布地址
router.get('/hireprovinces/list',controller.hireprovinces.list);
router.get('/hireprovinces/getById', controller.hireprovinces.find);
router.post('/hireprovinces/add', controller.hireprovinces.add);
router.post('/hireprovinces/update', controller.hireprovinces.update);
router.post('/hireprovinces/delete', controller.hireprovinces.destroy);

//项目价格
router.get('/hirepricerange/list',controller.hirepricerange.list);
router.get('/hirepricerange/getById', controller.hirepricerange.find);
router.post('/hirepricerange/add', controller.hirepricerange.add);
router.post('/hirepricerange/update', controller.hirepricerange.update);
router.post('/hirepricerange/delete', controller.hirepricerange.destroy);

//外包项目
router.get('/hireoutsideprojects/listByPage',controller.hireoutsideprojects.getListWithPage);
router.get('/hireoutsideprojects/getById', controller.hireoutsideprojects.find);
router.post('/hireoutsideprojects/add', controller.hireoutsideprojects.add);
router.post('/hireoutsideprojects/update', controller.hireoutsideprojects.update);
router.post('/hireoutsideprojects/delete', controller.hireoutsideprojects.destroy);



// 单文件上传
router.post('/goods/singleUpload', controller.upload.fileSingleUpload);
router.post('/goods/multipleUpload', controller.upload.MultipleUpload);


//首页轮播图路由
router.get('/banner/list', controller.banner.list);
router.get('/banner/getModelById', controller.banner.find);
router.post('/banner/add', controller.banner.add);
router.post('/banner/update', controller.banner.update);
router.post('/banner/delete', controller.banner.destroy);

//首页广告
router.get('/homeads/list', controller.homeads.list);
router.get('/homeads/getModelById', controller.homeads.find);
router.post('/homeads/add', controller.homeads.add);
router.post('/homeads/update', controller.homeads.update);
router.post('/homeads/delete', controller.homeads.destroy);

//友情链接
router.get('/homelinks/list', controller.homelinks.list);
router.get('/homelinks/getModelById', controller.homelinks.find);
router.post('/homelinks/add', controller.homelinks.add);
router.post('/homelinks/update', controller.homelinks.update);
router.post('/homelinks/delete', controller.homelinks.destroy);

//论坛轮播
router.get('/bbsslide/list', controller.bbsslide.list);
router.get('/bbsslide/getModelById', controller.bbsslide.find);
router.post('/bbsslide/add', controller.bbsslide.add);
router.post('/bbsslide/update', controller.bbsslide.update);
router.post('/bbsslide/delete', controller.bbsslide.destroy);

//社区广告
router.get('/bbsads/list', controller.bbsads.list);
router.get('/bbsads/getModelById', controller.bbsads.find);
router.post('/bbsads/add', controller.bbsads.add);
router.post('/bbsads/update', controller.bbsads.update);
router.post('/bbsads/delete', controller.bbsads.destroy);

//社区版块分类
router.get('/bbscategories/list', controller.bbscategories.list);
router.get('/bbscategories/getModelById', controller.bbscategories.find);
router.get('/bbscategories/getModelByPid', controller.bbscategories.findPid);
router.post('/bbscategories/add', controller.bbscategories.add);
router.post('/bbscategories/update', controller.bbscategories.update);
router.post('/bbscategories/delete', controller.bbscategories.destroy);

//社区帖子表
router.get('/bbsinfos/list', controller.bbsinfos.list);
router.get('/bbsinfos/getModelById', controller.bbsinfos.find);
router.post('/bbsinfos/add', controller.bbsinfos.add);
router.post('/bbsinfos/update', controller.bbsinfos.update);
router.post('/bbsinfos/delete', controller.bbsinfos.destroy);
router.get('/bbsinfos/listByPage', controller.bbsinfos.getListWithPage);

//帖子评论表
router.get('/bbscomments/list', controller.bbscomments.list);
router.get('/bbscomments/getModelById', controller.bbscomments.find);
router.get('/bbscomments/getModelByInfoId', controller.bbscomments.findByInfoId);
router.post('/bbscomments/add', controller.bbscomments.add);
router.post('/bbscomments/update', controller.bbscomments.update);
router.post('/bbscomments/delete', controller.bbscomments.destroy);

//书城轮播
router.get('/bookslide/list', controller.bookslide.list);
router.get('/bookslide/getModelById', controller.bookslide.find);
router.post('/bookslide/add', controller.bookslide.add);
router.post('/bookslide/update', controller.bookslide.update);
router.post('/bookslide/delete', controller.bookslide.destroy);



// 卖家路由信息
router.get('/seller/list', controller.seller.list);
router.get('/seller/listByPage', controller.seller.getListWithPage);
router.get('/seller/getUserById', controller.seller.find);
router.post('/seller/add', controller.seller.add);
router.post('/seller/update', controller.seller.update);
router.post('/seller/delete', controller.seller.destroy);

//图书分类
router.get('/bookcategories/list',controller.bookcategories.list);
router.get('/bookcategories/getById', controller.bookcategories.find);
router.post('/bookcategories/add', controller.bookcategories.add);
router.post('/bookcategories/update', controller.bookcategories.update);
router.post('/bookcategories/delete', controller.bookcategories.destroy);

//图书信息
router.get('/bookdetails/list',controller.bookdetails.list);
router.get('/bookdetails/getById', controller.bookdetails.find);
router.post('/bookdetails/add', controller.bookdetails.add);
router.post('/bookdetails/update', controller.bookdetails.update);
router.post('/bookdetails/delete', controller.bookdetails.destroy);
router.get('/bookdetails/listByPage', controller.bookdetails.getListWithPage);

//目录表
router.get('/opencategories/list',controller.opencategories.list);

//课程表
router.get('/opencourses/getListWithPage',controller.opencourses.getListWithPage);
};
