# 路演扫码投票小程序

![](https://img.shields.io/badge/Writted%20By-Chnja-blue)
![](https://img.shields.io/badge/build-pass-green)
![](https://img.shields.io/badge/Powered%20By-Wechat-brightgreen)

> 这个小程序主要解决的是在一些线下的路演中需要观众扫描不用二维码进行投票的问题

## 程序截图及小程序码

<img src="https://user-images.githubusercontent.com/24524563/67764008-e750c200-fa83-11e9-915a-6080eba9af5d.jpg" style='max-width:300px'></img>

<img src="https://user-images.githubusercontent.com/24524563/67763674-33e7cd80-fa83-11e9-8aef-69017633ae48.jpg" style='max-width:300px'></img>

## 使用场景

这个小程序应用在[武汉大学思政超市青春导航](http://www.future.org.cn/info/1002/22061.htm)的线下路演中。参赛队伍被分为3条赛道，每1名参观的观众可以在每1条投出3票，投满9票投票方为有效。同时，在投满9票后，可以参与抽奖。

## 前端实现

上述功能共由两个页面实现：

1. home：这个界面上共显示9张卡片。用户每扫1个队伍二维码代表为这个队伍投出1票，并获得一张卡片。集齐9张卡片则显示“抽奖”和“查看投票”按键。
2. question：这个界面按照得票降序显示投票结果。

用户认证实现：通过```wx.login```获取code发送至后端获取唯一的**openid**认证用户

抽奖实现：抽奖的逻辑由后端完成，前端获取```formId```通过[模板消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)以推送的方式告知用户结果

## 图片预加载

小程序因为有2M的限制，绝大部分图片在挂在图床上的，那么在加载的过程中会存在一定的加载时间。微信小程序的逻辑是加载多少就显示多少，这也就导致图片会在刚加载时出现加载不全的问题。这里就需要做图片的预加载，但是由于微信小程序是没有```Image对象```的，就需要我们自己去写，我在github上找到了一个京东的小程序使用的方案[wxapp-img-loader](https://github.com/o2team/wxapp-img-loader)。

这里面的解决方案是：通过```<image>```自带的```bindload()```在图片完全加载后再调用显示出来，但是在实际使用时需要多次在```.wxml```和```.js```中多次引入组件，同时同一个页面中多个图片的demo在图片未完全加载前是采用不显示的方式解决的。

于是我自己写了预加载的逻辑：在图片未完全加载前显示本地的图片，在图片完全加载后进行替换显示。如果有时间，我过几天把这个做成一个可以直接在```.json```中引入的组件再发上来，这里立一个小小的Flag🚩

## 致谢

* [ColorUI CSS库](https://github.com/weilanwl/ColorUI)（小程序中的卡片抖动效果就是从这个组件库来的灵盖）
* [七牛云](https://portal.qiniu.com)

## 作者

Chnja from WuHan University

## 版权信息

Copyright © 2019, Chnja
Released under the [GNU General Public License v3.0](https://github.com/Chnja/QCDH-wxapp/blob/origin/LICENSE).