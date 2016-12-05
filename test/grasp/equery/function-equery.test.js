import test from 'ava'
import grasp from 'grasp'

let code = `function hello(x) {
  console.log(x)
}`

let expResult = `function goodbye(x) { console.log(x) }`

const find = 'function hello($args) { $body }'
const replace = 'function goodbye({{args}}) { {{body}} }'

const replacer = grasp.replace('equery', find, replace)
let result = replacer(code)

const log = console.log

test('replace function name', t => {
  log('result', result)
  t.is(result, expResult)
})
