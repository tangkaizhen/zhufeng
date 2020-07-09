let fs = require('fs')

// 多个异步并发执行，需要在同一时刻获取结果
function read(path,encoding){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,encoding,function(err,data){
            if(err) reject(err);//如果执行reject，就不会执行下面的resolve
            resolve(data)
        })
    })
}

Promise.all([read('./name.txt','utf8'),read('./age.txt','utf8')])
.then(data=>{
    console.log(data)
})
