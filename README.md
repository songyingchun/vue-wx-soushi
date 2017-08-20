# vue-wx-soushi
把公司的微信搜石商城项目用vue重构一次。此项目是个人瞎搞的项目，跟线上的微信商城有所区别。此项目有20个页面，包括登录注册，石材图库，精品商城，搜现货，个人中心，样板寄送等模块。

## 技术栈
vue2 + vuex + vue-router + vue-resource + webpack + ES6/7  + sass

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
git clone https://github.com/songyingchun/vue-wx-soushi.git  

cd vue-wx-soushi

npm install 或者 cnpm install

npm run dev(浏览器自动打开)

npm run build(打包生产环境)

```

# 目标功能
- [x] 精品推荐 -- 完成
- [x] 石材图库-搜索图片 -- 完成
- [x] 石材图库-详情页 -- 完成
- [x] 石材图库-图片放大缩小平移 -- 完成
- [x] 精品商城 -- 完成
- [x] 精品商城-详情页 -- 完成
- [x] 搜现货 -- 完成
- [x] 搜现货-详情页 -- 完成
- [x] 拍照找石 -- 完成
- [x] 个人中心-认证 -- 完成
- [x] 个人中心-收货地址增，删，改 -- 完成
- [x] 个人中心-修改密码 -- 完成
- [x] 登录 -- 完成
- [x] 注册 -- 完成
- [x] 找回密码 -- 完成

# 项目布局
```
.
vue-wx-soushi 
    │  .babelrc                             // babel配置文件
    │  .eslintignore                        // eslint忽略文件
    │  .eslintrc                            // eslint配置文件
    │  favicon.ico                          // logo图标
    │  index.html                           // 入口html文件
    │  package.json                         // package配置文件
    │  postcss.config.js                    // postcss配置文件
    │  webpack.config.js                    // webpack开发环境配置文件
    │  webpack.config.production.js         // webpack生产环境配置文件
    │  screenshots                          // 项目图片
    │  
    └─src                                  // 源码目录
        │  App.vue                          // 页面入口文件
        │  main.js                          // 程序入口文件，加载各种公共组件
        │  
        ├─common                           // 公共组件
        │      selectArea.js                // 全国省、市、县数据
        │      util.js                      // 公共方法
        │      
        ├─components                       // 公共组件    
        │  ├─circliful                      
        │  │      circliful.vue             // 相似度百分比组件
        │  │      
        │  ├─count                          
        │  │      count.vue                 // 选择数量组件
        │  │      
        │  ├─divider
        │  │      divider.vue               // 分割线组件
        │  │      
        │  ├─focus
        │  │      focus.vue                 // 焦点图组件
        │  │      
        │  ├─footer
        │  │  │  footer.vue                 // 底部公共组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─gallerypiclist                 
        │  │  │  gallerypiclist.vue         // 图库图片列表组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─loadingbar
        │  │      loadingbar.vue            // 加载状态组件
        │  │      
        │  ├─maskerconfirm
        │  │      maskerconfirm.vue         // 确认弹窗组件
        │  │      
        │  ├─maskerdetailerror
        │  │  │  maskerdetailerror.vue      // 出错页面组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─maskerfail 
        │  │  │  maskerfail.vue             // 提交失败弹窗组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─maskerguider                   
        │  │  │  maskerguider.vue           // 引导弹窗组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─maskersuccess
        │  │  │  maskersuccess.vue          // 提交成功弹窗组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─maskerswiper
        │  │      maskerswiper.vue           // 切换弹窗组件
        │  │      
        │  ├─maskertips
        │  │      maskertips.vue             // 提示弹窗组件 
        │  │      
        │  ├─navguider
        │  │  │  navguider.vue              // 图库详情引导组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─navlist
        │  │  │  navlist.vue                // 导航组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─piclist
        │  │      piclist.vue               // 图片列表组件
        │  │      
        │  ├─price
        │  │  │  price.vue                  // 价格组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─proposeprice                   // 参考价组件
        │  │  │  proposeprice.vue
        │  │  │  
        │  │  └─icon
        │  ├─receiveinfo
        │  │  │  receiveinfo.vue            // 收货信息组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─search
        │  │  │  search.vue                 // 图片搜索组件
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─selectarea
        │  │      selectarea.vue             // 选择地区组件 
        │  │      
        │  ├─showsearchpic
        │  │      showsearchpic.vue          // 显示价格组件
        │  │      
        │  ├─submit
        │  │      submit.vue                 // 提交按钮组件
        │  │      
        │  ├─supplier
        │  │      supplier.vue               // 提供商组件
        │  │      
        │  └─swiperfocus
        │      │  swiperfocus.vue            // 切换焦点图组件 
        │      │  
        │      └─icon
        │              
        ├─config                             // 基本配置
        │      flexible.js                    // 淘宝flexible
        │      url.js                         // 数据地址
        │      
        ├─data                               // 本地数据
        │      
        ├─images                             // 公共图片                     
        ├─page                               // 页面
        │  ├─addAddress                     
        │  │  │  addAddress.vue             // 添加收货地址    
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─authorized
        │  │  │  authorized.vue             // 个人认证
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─boutique                       // 精品商城
        │  │  │  boutique.vue
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─boutiqueDetail                 // 精品商城详情页
        │  │  │  boutiqueDetail.vue
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─editorAddress                   
        │  │  │  editorAddress.vue          // 编辑收货地址              
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─findPassword
        │  │  │  findPassword.vue           // 找回密码
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─forgetPassword
        │  │  │  forgetPassword.vue         // 忘记密码
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─gallery
        │  │  │  gallery.vue                // 石材图库
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─galleryDetail
        │  │  │  galleryDetail.vue          // 图库详情页
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─gallerySend                    
        │  │      gallerySend.vue           // 图库样板寄送
        │  │      
        │  ├─index          
        │  │      index.vue                 // 首页
        │  │      
        │  ├─login                          
        │  │  │  login.vue                 // 登录
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─manageAddress
        │  │  │  manageAddress.vue          // 管理收货地址
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─modifyPassword             
        │  │      modifyPassword.vue         // 修改密码
        │  │      
        │  ├─personal
        │  │  │  personal.vue               // 个人中心
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─photo
        │  │  │  photo.vue                  // 拍照找石
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─register
        │  │  │  register.vue               // 注册
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─search
        │  │  │  search.vue                 // 搜现货
        │  │  │  
        │  │  └─icon
        │  │          
        │  ├─searchDetail
        │  │  │  searchDetail.vue           // 搜现货详情页
        │  │  │  
        │  │  └─icon
        │  │          
        │  └─send
        │      │  send.vue                  // 样板寄送    
        │      │  
        │      └─icon
        │              
        ├─plugins                           // 插件
        │      circliful.js                  // 相似百分比
        │      iscroll-probe.js              // iscroll
        │      MD5.js                        // MD5
        │      pinchzoom.js                  // 图片放大缩小平移
        │      processImg.js                 // 上传图片
        │      swipe.js                      // 图片切换
        │      swiper.js                     // 图片切换
        │      
        ├─router                            
        │      router.js                     // 路由配置
        ├─store                             // vuex的状态管理
        │      actions.js                    // 配置actions
        │      getters.js                    // 配置getters
        │      index.js                      // 引用vuex，创建store
        │      modules.js                    // store模块
        │      mutation-type.js              // 定义常量muations名   
        │      mutations.js                  // 配置mutations
        │      
        └─style
                common.scss                   // 公共样式文件
                mixin.scss                    // mixin样式函数
                reset.css                   
                swiper.css                    
.

```
