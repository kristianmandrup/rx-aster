import test from 'ava'
import grasp from 'grasp'

let code = `class CoolGang {
  cool(x) {
    console.log(x)
  }
}`

const log = console.log

const find = 'class-dec[id=#CoolGang] method[key=#cool]'
const replace = `uncool {{.value}}`

const replacer = grasp.replace('squery', find, replace)

let result = replacer(code)

test('rename class method', t => {
  log('RENAME CLASS result::', result)
  t.regex(result, /uncool/, 'method cool renamed to uncool')
})
