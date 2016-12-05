import test from 'ava'
import grasp from 'grasp'

let code = `var a = 1 + 2`

const replacer = grasp.replace('equery', '__ + __', '{{.l}} - {{.r}}')
let processed = replacer(code)

const log = console.log

test('replace + with -', t => {
  log('code x', processed)
  t.is(processed, `var a = 1 - 2`)
})
