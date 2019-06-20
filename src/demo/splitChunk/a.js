import _ from 'lodash'
import skt from './sktTeam'

const faker = _.find(skt,{name: '李相赫'})

console.log(faker)