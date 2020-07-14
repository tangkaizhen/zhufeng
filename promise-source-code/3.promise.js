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
            self.value = value
            self.status = 'resolved'
            self.onResolvedCallbacks.map(fn=>{
                fn()
            })
        }

    }
    function reject(reason){
        if(self.status == 'pending'){
            self.reason = reason
            self.status = 'rejected'
            self.onRejectCallbacks.map(fn=>{
                fn()
            })
        }
    }
    
    // try-catch只适用于同步代码，异步代码不能用。

    try {
        executor(resolve,reject)
    } catch (error) {
        // 如果执行执行器发生异常时候，需要走then的失败函数，或者是catch
        reject(error)
    }
    
}

function resolvePromise(x,promise2,resolve,reject){
    if(x === promise2){
        return reject(new TypeError('自己不能等待自己'))
    }

    // 如果x是一个对象或者方法，就有可能是一个promise 
    if(x != null && (typeof x == 'function' || typeof x == 'object')){
        try {
            let then = x.then
            if(typeof then == 'function'){
                // 说明是promise
                then.call(x,function(y){
                    resolve(y)
                },function(r){
                    reject(r)
                }) 
            }else{
                resolve(x)
            }

        } catch (error) { 
            reject(error)    
        }

    }else{
        // 普通值的情况可以直接成功即可
        resolve(x)
    }

}

Promise.prototype.then=function(onFulfilled,onRejected){
    let self = this
    let promise2 = new Promise(function(resolve,reject){

        if(self.status == 'resolved'){
             
            /**
             * 
             * 我们需要做的事情就是把then中成功或者失败后的函数执行的结果获取到，判断结果是promise，还是普通值，如果是promise，就让promise立即
             * 执行，取到这个最终的执行结果
             * 如果是返回值是普通值，就让下一个promise变成成功态
             */

            setTimeout(()=>{
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(x,promise2,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            },0)
        }

        if(self.status == 'rejected'){
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(x,promise2,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            },0)
        }

        if(self.status == 'pending'){
            self.onResolvedCallbacks.push(function(){
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value)
                        resolvePromise(x,promise2,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                    
                },0)
            })  
    
            self.onRejectCallbacks.push(function(){
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason)
                        resolvePromise(x,promise2,resolve,reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            })
        }

    })

    return promise2
}

module.exports=Promise