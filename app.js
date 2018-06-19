//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var goods = wx.getStorageSync('goods');
    if (!goods) {
      goods = this.loadGoods();
      wx.setStorageSync('goods', goods);
    }


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  loadGoods:function() {

    var goods = new Array();
    var good = new Object();
    good.count = 0;
    good.id = "0";
    good.pic = 'http://s2.cdn.xiachufang.com/63a75ec2884f11e6a9a10242ac110002_640w_640h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good.name = ' 红烧土豆0';
    good.price = '11.22';
    good.type = 'tttj';
    goods[0] = good;

    var good1 = new Object();
    good1.count = 0;
    good1.id = "1";
    good1.pic = 'http://s2.cdn.xiachufang.com/0ea0dc20873a11e6a9a10242ac110002_500w_372h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good1.name = ' 红烧土豆1';
    good1.price = '11.0';
    good1.type = 'tttj';
    goods[1] = good1;

    var good2 = new Object();
    good2.count = 0;
    good2.id = "2";
    good2.pic = 'http://s2.cdn.xiachufang.com/73a373d6d95a11e6bc9d0242ac110002_1280w_960h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good2.name = ' 红烧土豆3';
    good2.price = '11.0';
    good2.type = 'tttj';
    goods[2] = good2;

    var good3 = new Object();
    good3.count = 0;
    good3.id = "3";
    good3.pic = 'http://s1.cdn.xiachufang.com/101403a8873911e6a9a10242ac110002_600w_450h.jpg@2o_50sh_1pr_1l_660w_90q_1wh';
    good3.name = ' 西红柿炒蛋0';
    good3.price = '11.0';
    good3.type = 'tttj';
    goods[3] = good3;

    var good4 = new Object();
    good4.count = 0;
    good4.id = "4";
    good4.pic = 'http://s2.cdn.xiachufang.com/ea885ab6873e11e6a9a10242ac110002_600w_398h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good4.name = ' 西红柿炒蛋1';
    good4.price = '11.0';
    good4.type = 'tttj';
    goods[4] = good4;

    var good5 = new Object();
    good5.count = 0;
    good5.id = "5";
    good5.pic = 'http://s2.cdn.xiachufang.com/a284fcea86fa11e6a9a10242ac110002_600w_400h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good5.name = ' 巧克力';
    good5.price = '11.0';
    good5.type = 'tttj';
    goods[5] = good5;

    var good6 = new Object();
    good6.count = 0;
    good6.id = "6";
    good6.pic = 'http://s2.cdn.xiachufang.com/dbeb559489f511e6b87c0242ac110003_2816w_1880h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good6.name = ' 汤圆';
    good6.price = '11.0';
    good6.type = 'ty';
    goods[6] = good6;

    var good7 = new Object();
    good7.count = 0;
    good7.id = "7";
    good7.pic = 'http://s2.cdn.xiachufang.com/9edf71148ae811e6a9a10242ac110002_828w_1108h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good7.name = ' 优选水果';
    good7.price = '11.0';
    good7.type = 'yxsg';
    goods[7] = good7;

    var good8 = new Object();
    good8.count = 0;
    good8.id = "8";
    good8.pic = 'http://s1.cdn.xiachufang.com/9478a9dc8a8111e6a9a10242ac110002_1333w_1000h.jpg@2o_50sh_1pr_1l_660w_90q_1wh';
    good8.name = ' 牛奶面包';
    good8.price = '11.0';
    good8.type = 'nnmb';
    goods[8] = good8;

    var good9 = new Object();
    good9.count = 0;
    good9.id = "9";
    good9.pic = 'http://s2.cdn.xiachufang.com/e25c1a7086f911e6a9a10242ac110002_490w_663h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good9.name = ' 卤味熟食';
    good9.price = '11.0';
    good9.type = 'lwss';
    goods[9] = good9;

    var good10 = new Object();
    good10.count = 0;
    good10.id = "10";
    good10.pic = 'http://s2.cdn.xiachufang.com/bfb7c4de8b5311e6b87c0242ac110003_1350w_1800h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good10.name = ' 饮料酒水';
    good10.price = '11.0';
    good10.type = 'yljs';
    goods[10] = good10;

    var good11 = new Object();
    good11.count = 0;
    good11.id = "11";
    good11.pic = 'http://s2.cdn.xiachufang.com/4ff91ca6a27d11e6bc9d0242ac110002_536w_402h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good11.name = ' 休闲零食';
    good11.price = '11.0';
    good11.type = 'xxls';
    goods[11] = good11;

    var good12 = new Object();
    good12.count = 0;
    good12.id = "12";
    good12.pic = 'http://s2.cdn.xiachufang.com/5bf6048a893011e6b87c0242ac110003_600w_400h.jpg?imageView2/2/w/660/interlace/1/q/90';
    good12.name = ' 方便素食';
    good12.price = '11.0';
    good12.type = 'fbss';
    goods[12] = good12;

    return goods;
  },


  globalData: {
    userInfo: null
  }
})

