import test from 'ava'
import grasp from 'grasp'

let code = `class CoolGang {
  cool(x) {
    console.log(x)
  }
}`

const log = console.log

const find = 'class-dec[id=#CoolGang] method[key=#cool]'
const replace = ``

const replacer = grasp.replace('squery', find, replace)

let result = replacer(code)

test('add class method', t => {
  log('REMOVE CLASS result::', result)
  t.notRegex(result, /cool/, 'method cool removed')
})
