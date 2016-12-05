import test from 'ava'
import grasp from 'grasp'

let code = `function hello(x) {
  console.log(x)
}`

let expResult = `function hello(x) {
  console.log(x)
}

function goodbye(x) {
  console.log(x)
}`

const find = 'func-dec[id=#hello]'
const replace = `{{}} function goodbye(x) {
  console.log(x)
}`

const replacer = grasp.replace('squery', find, replace)
let result = replacer(code)

const log = console.log

test('replace function name', t => {
  log('result', result)
  t.regex(result, /function goodbye/, 'function goodbye added after function hello')
  t.is(result, expResult)
})
