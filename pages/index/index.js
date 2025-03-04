// pages/index_address/index_address.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
var util_s = require('../../utils/util_s.js');
const app = getApp();
Page({
  data: {
      title: "",
      address: "", 
      touchx: 0,
      touchy: 0, 
      default_address:true
  }, 

  onLoad: function (options) {
    // const query = wx.createSelectorQuery()
    // query.select('#myQrcode')
    // .fields({
    //     node: true,
    //     size: true
    // })
    // .exec((res) => {
    //   var canvas = res[0].node
    
    //   // 调用方法drawQrcode生成二维码
    //   drawQrcode({
    //       canvas: canvas,
    //       canvasId: 'myQrcode',
    //       width: 200,
    //       height:200,
    //       padding: 30,
    //       background: "#FFFFFF",
    //       foreground: '#09BC68',
    //       text: '个人二维码信息',

    //   })
    //   wx.canvasToTempFilePath({
    //     canvasId: 'myQrcode',
    //     canvas: canvas,
    //     x: 0,
    //     y: 0,
    //     width: 200,
    //     height: 200,
    //     destWidth: 200,
    //     destHeight: 200,
    //     success(res) {
    //         console.log('二维码临时路径：', res.tempFilePath)
    //     },
    //     fail(res) {
    //         console.error(res)
    //     }
    //   })
    // })

    var that = this;
    // get init brightness
    wx.getScreenBrightness({
      success: function (res) {that.setData({ScreenBrightness: res.value})}
    }) 
    wx.setScreenBrightness({value: 1})
    // update time every second
    setInterval(function () {
      that.setData({
        Time: util_s.formatTime(new Date()),
        Time_s: util_s.formatTime_s(new Date())
      }); 
    }, 1000);
  }, 

  // 记录触摸起点
  touchStart(e) {
    var that = this;
    that.setData({
      touchx: e.changedTouches[0].clientX,
      touchy: e.changedTouches[0].clientY,
    })
  },

  touchEnd(e) {
    var that = this;
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let turn = "";
    if (x - that.data.touchx > 50 && Math.abs(y - that.data.touchy) < 50) {      //右滑
      turn = "right"
    } else if (x - that.data.touchx < -50 && Math.abs(y - that.data.touchy) < 50) {   //左滑
        turn="left";
    }
    //根据方向进行操作
    if(turn == 'left'){
        wx.navigateTo({
          url: '../index_adress/index_adress',
        }) ; 
    }
  }, 
  // set brightness to init
  onUnload: function () { 
    wx.setScreenBrightness({value: this.data.ScreenBrightness})
  },
})