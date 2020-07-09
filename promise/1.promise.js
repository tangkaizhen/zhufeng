// Promise可以解决  1：回调地域  2：多个异步请求在同一个时间合并结果
/**
 * Promise 是浏览器自带的，但是低版本的浏览器可能不支持
 * Promise是一个类 Promise使用的时候需要new Promise
 * new Promise需要传递一个executor执行器 (executor是同步执行的，立即执行)
 * 每个Promise的实例上都有一个then方法，then方法中有两个函数（成功函数和失败函数）
 * promise有三种状态 pedding resolved  rejected
 * 
 * 
 */

let p = new Promise((resolve,reject)=>{
    resolve('有钱任性')
})

p.then(function(v){
    console.log(v)
},function(fail){
    console.log(fail)
})