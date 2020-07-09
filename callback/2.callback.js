let fs = require('fs')

let school={}

function after(times,callback){
    return function(){
        if(--times == 0){
            callback()
        }
    }
}

let out=after(2,(data)=>{
    console.log(school)
})

// readFile读取的是项目的根目录
fs.readFile('./name.txt','utf8',function(err,data){
    school.name=data
    out()
})
fs.readFile('./age.txt','utf8',function(err,data){
    school.age=data
    out()
})