/**
 *   js是单线程，同步代码是依次执行，异步代码是在同步之后执行的代码
 *   之前处理异步的方式是回调函数，callback
 *   高阶函数：
 *   1，函数可以以一个函数作为参数
 *   2，函数可以返回一个函数
 *   code runner :相当于在本地开一个服务器，而且可以选择性的执行代码，其原理就是node
 *   模拟几秒之后再执行的代码，可以使用setTimeout
 *   promise也是基于callback的，只是优化了callback 
 *   异步代码不支持try-catch，try-catch支持同步代码
 *
 */

 
function * gen(){
    let a = yield 1
    console.log(a)

    let b = yield 2
    console.log(b)

    let c = yield 3
    console.log(c)
}

let it = gen()
// 第一次调用next，传递的参数是无效的
it.next()

// 第二次执行next，传递的参数会返回给第一次yield的返回值
it.next('hello')
it.next('sas')


