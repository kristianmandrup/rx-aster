import test from 'ava'
import grasp from 'grasp'

let code = `class Hello {
}`

let expResult = `class Hello{
}

class Goodbye {
}`

const find = 'class-dec[id=#Hello]'
const replace = `{{}} class Goodbye {
}`

const replacer = grasp.replace('squery', find, replace)
let result = replacer(code)

const log = console.log

test('add class after', t => {
  log('result', result)
  t.regex(result, /class Goodbye/, 'class Goodbye added after class Hello')
  t.is(result, expResult)
})
