Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    flag: 0,
    orders: [],
    catagory: ['rxb', 'tttj', 'qkl', 'ty', 'yxsg', 'nnmb', 'lwss', 'yljs', 'xxls', 'fbss'],
    goods: [[], [], [], [], [], [], [], [], [], [], []],
    counts: [[], [], [], [], [], [], [], [], [], [], []],
  },

  switchNav:function(event) {
    console.log(event);
    var page = this;
    var id = event.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({currentTab: id});
    }
    page.setData({ flag: id });
  },


  changeSwiper:function(event) {
    var page = this;
    var goto = event.detail.current;
    page.setData({currentTab: goto, flag:goto})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadGoods();
    this.loadOrders();
  },

  getJsonLength: function(jsonData) {  
    var jsonLength = 0;  
    for(var item in jsonData) {  
      jsonLength++;
    }
    return jsonLength;
  },

  loadGoods: function() {
    var page = this;
    var goods = wx.getStorageSync('goods');
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      var goodtype = good.type;
      var goodcount = good.count;
      for (var m = 0; m < page.data.catagory.length; m++) {
        if (goodtype == page.data.catagory[m]) {
          var goodname = ['goods[', m, ']'].join("");
          var countname = ['counts[', m, ']'].join("");
          page.setData({
            [goodname]: page.data.goods[m].concat([good]),
            [countname]: page.data.counts[m].concat([goodcount])
          });
        } 
      }
    }
  },

  loadOrders: function() {
    var page = this;
    var orders = wx.getStorageSync('orders');
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      var ordercount = order.count;
      var ordertype = order.type;
      var orderid = order.id
      for (var first = 0; first < page.data.catagory.length; first++) {
        if (ordertype == page.data.catagory[first]) {
          var sublst = page.data.counts[first];
          for (var second = 0; second < sublst.length; second++) {
            var goodid = page.data.goods[first][second].id;
            if (orderid == goodid) {
              var name0 = ['counts[', first, '][', second, ']'].join("");
              page.setData({
                [name0]: ordercount
              });
            }
          }
        }
      }
    }
  },

  addGoods:function(event) {
    var goods = wx.getStorageSync("goods");
    var raw = event.currentTarget.id.split(',');
    var firstindex = raw[1];
    var secondindex = raw[2];
    var id = raw[0];
    var good = {};
    var newGoods = [];
    for (var i=0; i < goods.length; i++) {
      var oldgood = goods[i];
      if (oldgood.id == id) {
        var oldcount = oldgood.count;
        var newcount = oldcount + 1;
        good = oldgood;
        break;
      }
    }

    var orders = wx.getStorageSync('orders');
    var addOrders = new Array();
    var add = true;
    for (var i=0; i < orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        order.count = count + 1;
        add = false;
      }
      addOrders[i] = order;
    }

    var len = orders.length;
    if (add) {
      good.count = 1;
      addOrders[len] = good;
    }

    wx.setStorageSync('orders', addOrders);
    console.log("check if the order really changed?", addOrders);
    console.log("check the counts:", this.data.counts)

    var page = this;
    page.changeCount(firstindex, secondindex, true); 


    wx.showToast({
      title: '添加至购物车',
      icon: 'success',
      duration: 1000,
    });
  },

  minusGoods: function (event) {
    var goods = wx.getStorageSync('goods');
    var raw = event.currentTarget.id.split(',');
    var firstindex = raw[1];
    var secondindex = raw[2];
    var id = raw[0];
    var good = {};
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }

    var orders = wx.getStorageSync('orders');
    var minusOrders = new Array();
    var minus = true;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        if (count >= 1) {
          order.count = count - 1;
        }
      }
      minusOrders[i] = order;
    }
    wx.setStorageSync('orders', minusOrders);
    console.log("check if the order really changed?", minusOrders)
    console.log("check the counts:", this.data.counts)

    var page = this;
    page.changeCount(firstindex, secondindex, false);


    wx.showToast({
      title: ' 减少成功',
      icon: 'success',
      duration: 1000,
    });
  },

  changeCount: function(first, second, add) {
    console.log(first)
    var oldcount = this.data.counts[first][second]
    var name = ['counts[', first, '][',second, ']'].join("");
    if (add) {
      var newcount = parseInt(oldcount) + 1
      this.setData({ [name]: newcount })
    } else {
      var newcount = parseInt(oldcount) - 1
      this.setData({ [name]: newcount })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadOrders();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})