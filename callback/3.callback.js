// 发布订阅模式
// 将需要订阅的内容放到一个队列中，然后发布的时候依次执行队列中的数据
let fs = require('fs')
let school={}

let Dep={
    arr:[],
    on(callback){
        this.arr.push(callback)
    },
    emit(){
        if(Object.keys(school).length==2){
            this.arr.map(fn=>{
                fn()
            })
        }
    }
}

Dep.on(function(){
    console.log(school)
})
Dep.on(function(){
    console.log('结束了')
})

// readFile读取的是项目的根目录
fs.readFile('./name.txt','utf8',function(err,data){
    school.name=data
    Dep.emit()
})
fs.readFile('./age.txt','utf8',function(err,data){
    school.age=data
    Dep.emit()
})