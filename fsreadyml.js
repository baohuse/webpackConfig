const yaml = require('js-yaml')
const fs = require('fs')

let obj = yaml.safeLoad(fs.readFileSync('server.yml', 'utf-8'))
console.log('转化', obj)

// {
//     proxy:
//     { rules: { '^/api': 'http://rap2api.taobao.org/app/mock/84689/' } }
// }