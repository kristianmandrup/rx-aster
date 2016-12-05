import test from 'ava'
import grasp from 'grasp'

let code = `function hello(x) {
  console.log(x)
}`

const find = 'func-dec[id=#hello]'
const replace = ''

const replacer = grasp.replace('squery', find, replace)
let result = replacer(code)

const log = console.log

test('remove function', t => {
  log('result', result)
  t.notRegex(result, /hello/, 'function hello removed')
})
