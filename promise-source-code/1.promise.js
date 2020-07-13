function Promise(executor){
    let self=this

    // 保存成功和失败的值
    self.value=undefined
    self.reason=undefined

    // 使用发布订模式进行异步操作
    self.onResolvedCallbacks = []
    self.onRejectCallbacks = []

    // promise有三种状态
    self.status = 'pending'

    function resolve(value){
        
        if(self.status == 'pending'){
            self.value=value
            self.status = 'resolved'
            self.onResolvedCallbacks.map(fn=>{
                fn()
            })
        }

    }
    function reject(reason){
        if(self.status == 'pending'){
            self.reason=reason
            self.status = 'rejected'
            self.onRejectCallbacks.map(fn=>{
                fn()
            })
        }
    }

    executor(resolve,reject)
}

Promise.prototype.then=function(onFulfilled,onRejected){
    let self = this
    if(self.status == 'resolved'){
        onFulfilled(self.value)
    }
    if(self.status == 'rejected'){
        onRejected(self.reason)
    }
    if(self.status == 'pending'){
        self.onResolvedCallbacks.push(function(){
            onFulfilled(self.value)
        })

        self.onRejectCallbacks.push(function(){
            onRejected(self.reason)
        })
    }
}
module.exports=Promise