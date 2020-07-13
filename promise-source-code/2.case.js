let Promise = require('./2.promise.js')
let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve()
    }, 1000);    
})

let p1 = p.then((data)=>{
    return new Promise(function(re,rj){
        re(1000)
    })
},(err)=>{
    console.log(err)
}).then((data)=>{
    console.log(data)
},(err)=>{
    console.log(err)
})