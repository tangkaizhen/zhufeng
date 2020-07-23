let fs = require('fs')
let bluebird = require('bluebird')
let read = bluebird.promisify(fs.readFile)

function* r(){ 
  let age = yield read('name.txt','utf8')
  let address = yield read(age,'utf8')
  let r = yield read(address,'utf8')
  return r
}

function co(it){
    return new Promise((resolve,reject)=>{
        function next(data){
            let {value,done} = it.next(data)
            if(!done){
                value.then(data=>{
                    next(data)
                })
            }else{
                resolve(value)
            }
        }
        next()
    })
}

co(r()).then(data=>{
    console.log(data)
})
