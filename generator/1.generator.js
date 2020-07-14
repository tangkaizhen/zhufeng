/**
 * generator 生成器,是用来生成迭代器的
 * generator和async+await都是解决异步的方案，目前async，await可以取代generator
 * 迭代器指有个next方法的对象，每次调用next方法都会返回一个对象，对象里面有done和value
 * for of 必须拥有迭代器元素才可以调用
 * generator可以配合promise使用,也可以不配合
 * 
 */

function arg(){
    //arguments 参数组成的数组，arguments其中有iterator
    console.log(arguments)
}

// arg(1,2,3,4) 

// ----------------------------

let likeArray = {
    0:1,1:2,2:3,length:3,[Symbol.iterator](){
        let index = 0
        let that = this
        return {
            next(){
                return {done : index == that.length ,value:that[index++]}
            }
        }
    }
}
let arr = [...likeArray]
console.log(arr)

//-----------------------------

// 加上 * 表示的是生成器函数  一般可以配合yield使用
let likeArray = {
    0:1,1:2,2:3,length:3,[Symbol.iterator]:function*(){
        let index = 0
        while(index!=this.length){
            yield this[index++]
        }
    }
}
// ...likeArray会让迭代器执行
let arr = [...likeArray]
console.log(arr)
 
// ----------------------------

// generator遇到yield就会暂停,调用next会继续向下执行
function * gen(){
    yield 1;
    yield 2;
}

let it = gen()
let flag = false

do {
    let {value,done} = it.next()
    console.log(value)
    flag = done 
}while(!flag)

////////////////////////////

