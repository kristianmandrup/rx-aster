import test from 'ava'
import grasp from 'grasp'

let code = `export default class Model {
  constructor() {
  }

  display(x) {
    console.log(x)
  }
}`


// let expResult = `export default class Control {
//   constructor() {
//   }

//   display(x) {
//     console.log(x)
//   }
// }`

const find = 'class-dec[id=#Model]'
const replace = ''

const replacer = grasp.replace('squery', find, replace)
let result = replacer(code)

const log = console.log

test('replace class name', t => {
  log('result', result)
  t.notRegex(result, /Model/, 'Model class removed')
})
