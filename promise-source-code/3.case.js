let Promise = require('./3.promise.js')

let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve()
    }, 1000);    
})

let p1 = p.then((data)=>{
    // 这个函数的执行结果有可能是promise，有可能是普通值
    // return new Promise(function(re,rj){
    //     re(1000)
    // })

    throw new Error();
},(err)=>{
    console.log(err)
}).then((data)=>{
    console.log(data)
},(err)=>{
    console.log('err:'+err)
})