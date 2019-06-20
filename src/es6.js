import _ from 'lodash'

export const add = (x,y) => (x+y)

export const promise = new Promise((resolve, reject) => {
    //过了1秒之后
    setTimeout(() => {
        resolve()
    },1000)
})