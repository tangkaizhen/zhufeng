function after(times,callback){
    return function(){
        if(--times==0){
            callback()
        }
    }
}

let fn = after(3,function(){
    console.log('fn被调用了3次')
})

fn()
fn()
fn()

// 读一个文件，3s后给出结果
function read(callback){
    setTimeout(function(){
        let r = 'zfpx'
        callback(r)
    },3000)
}

read((result)=>{
    console.log(result)
})