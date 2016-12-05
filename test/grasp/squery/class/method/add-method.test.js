import test from 'ava'
import grasp from 'grasp'

let code = `class CoolGang {
  cool(x) {
    console.log(x)
  }
}`

const log = console.log

const find = 'class-dec[id=#CoolGang] method[key=#cool]'
const replace = `{{}}
  goodbye() {
    console.log('bye')
  }
`

const replacer = grasp.replace('squery', find, replace)

let result = replacer(code)

test('add class instance method', t => {
  log('ADD CLASS result::', result)
  t.regex(result, /goodbye/, 'method goodbye added after function hello')
})
