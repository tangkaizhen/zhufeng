let fs = require('fs')
/**
 * 
 * then方法执行完，会判断返回的结果，如果是promise，会把这个promise继续执行，会去到他的结果
 * 每次调用then后，会再返回一个新的promise
 * promise链式调用，解决了回调嵌套的问题
 * 
 */
function read(path,encoding){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,encoding,function(err,data){
            if(err) reject(err);//如果执行reject，就不会执行下面的resolve
            resolve(data)
        })
    })
}

read('./name.txt','utf8').then((data)=>{
    return read(data,'utf8')
}).then(data=>{
    return read(data,'utf8')
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})
