import test from 'ava'
import grasp from 'grasp'

let code = `var a = 1 + 2`
const find = '$x + $y'
const replace = '{{x}} - {{y}}'

const replacer = grasp.replace('equery', find, replace)
let processed = replacer(code)

const log = console.log

test('replace + with -', t => {
  log('code x', processed)
  t.is(processed, `var a = 1 - 2`)
})
