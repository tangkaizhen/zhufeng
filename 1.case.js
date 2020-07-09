let Promise = require('./1.promise.js')
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('hello')
    },1000)
})

p.then((data)=>{
    console.log('val:'+data)
},(err)=>{
    console.log('reason:'+err)
})