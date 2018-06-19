Page({

  /**
   * 页面的初始数据
   */
  data: {
    notknowAddress: true,
    address: '至善园7号',
    orders: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrders();
  },

  loadOrders: function () {
    var orders = wx.getStorageSync('orders');
    var page = this;
    var without0Orders = new Array()
    for (var i=0; i<orders.length; i++) {
      var order00 = orders[i]
      if (order00.count != 0) {
        without0Orders.push(order00);
      }
    }
    page.setData({orders: without0Orders});
    var totalPrice = 0;
    for (var i=0; i<orders.length; i++) {
      var order = orders[i];
      totalPrice += order.price * order.count;
    }
    this.setData({totalPrice: totalPrice});
  },

  checkboxChange:function(event) {
    console.log(event);
    var ids = event.detail.value;
    var orders = wx.getStorageSync('orders');
    if (ids.length < orders.length ) {
      this.setData({selectedAll: false});
    } else {
      this.setData({selectedAll: true});
    }
    var totalPrice = 0;
    for (var i=0; i<orders.length; i++) {
      var order = orders[i];
      for (var j=0; j<ids.length; j++) {
        if (order.id == parseInt(ids[j])) {
          totalPrice += order.price * order.count;
        }
      }
    }
    this.setData({totalPrice: totalPrice});
  },

  checkAll:function (event) {
    var result = !(this.data.selected);
    var selected = this.data.selected;
    this.setData({selected: result});
    if (result == false) {
      this.setData({totalPrice: 0});
      this.setData({selectedAll: false});
    } else {
      this.loadOrders();
      this.setData({selectedAll: true})
    }
  },

  addGoods: function (event) {
    var goods = wx.getStorageSync("goods");
    var id = event.currentTarget.id;
    var good = {};
    for (var i = 0; i < goods.length; i++) {
      var storedgood = goods[i];
      if (storedgood.id == id) {
        good = storedgood;
        break;
      }
    }
    
    var orders = wx.getStorageSync('orders');
    var addOrders = new Array();
    var add = true;
    for (var i = 0; i < orders.length; i++) {
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
    console.log('this is orders in store', addOrders)
    this.loadOrders();
  },

  minusGoods:function (event) {
    var goods = wx.getStorageSync('goods');
    var id = event.currentTarget.id;
    var good = {};
    for (var i=0; i<goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }

    var orders = wx.getStorageSync('orders');
    var minusOrders = new Array();
    var minus = true;
    for (var i=0; i<orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        if (count >=1) {
          order.count = count - 1;
        } 
      }
      minusOrders[i] = order;
    }
    wx.setStorageSync('orders', minusOrders);
    console.log('this is orders in store', minusOrders)
    this.loadOrders();
  },




  setAddress: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadOrders();
    
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
    this.loadOrders();
    
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