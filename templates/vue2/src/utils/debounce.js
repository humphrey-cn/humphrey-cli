/* @params { * } func
@params { * } delay
当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时。
也就是说当一个用户一直触发这个函数，且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。

页面中使用
import { debounce } from '@/$commom/utils/debounce'
methods: {
    需要触发的函数名称: debounce( function(){
        console.log('防抖')
    },1000)
} */

export function debounce(func, delay) {
    let timer
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(this, args)
        }, delay)
    }
}

/* @params { * } func
@params { * } delay
当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次

页面中使用
import { throttle } from '@/$commom/utils/debounce'
methods: {
    需要触发的函数名称: throttle( function(){
        console.log('节流')
    },1000)
} */

export function throttle(func, delay) {
    let timer
    return function() {
        if (timer !== null) return
        let context = this
        let args = arguments
        func.apply(context, args)
        timer = setTimeout(() => {
            timer = null
        }, delay)
    }
}


// 用一句话总结防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行






