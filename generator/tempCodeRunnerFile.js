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