import _ from 'lodash'
//会把所有方法打进去，而我们只用了 join, 所以，发布时TreeShaking是很有必要的
import { name } from './text'
import { add, promise } from './es6'
import './index.css'
import tt from './assets/tt.jpg'

//使用别名来简写模块文件的路径
const des = _.join(['你好', '朋友'], ',')

function component() {
    var element = document.createElement('div')
    let text = '异步之前'
    promise.then(() => {
        alert(des)
    })

    var p = document.createElement('p')
    //加载函数
    fetch('/api/test', {
        method: 'GET',
        mode: 'cors'
    }).then(res => {
        return res.json()
    }).then(json => {
        console.log('代理请求结果',json)
        p.innerHTML = JSON.stringify(json.result)
    })

    element.innerHTML = name + add(2,3)
    element.classList.add('hello')

    //添加照片
    var myIcon = new Image()
    myIcon.src = tt
    element.appendChild(myIcon)
    element.appendChild(p)
    return element
}

document.body.appendChild(component())