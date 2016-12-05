import test from 'ava'
import grasp from 'grasp'

let code = `function hello(x) {
  console.log(x)
}`

let expResult = `function goodbye(x) {
  console.log(x)
}`

const find = 'func-dec[id=#hello]'
const replace = 'goodbye'

const replacer = grasp.replace('squery', find, replace)
let result = replacer(code)

const log = console.log

test('replace function name', t => {
  log('result', result)
  t.is(result, expResult)
})
