import test from 'ava'
import grasp from 'grasp'
import _ from 'lodash'
import path from 'path'

// let search = {
//   equery: grasp.search('equery')
// }

let processed = {}

let code = `var a = 1 + 2`

const replacer = grasp.replace('equery', '__ + __', '{{.l}} - {{.r}}')
processed.x = replacer(code)

const reqCode = `var Abe = require('abe')`

processed.y = grasp.replace('squery', 'call[callee=#require]', (getRaw, node, query) => {
  let req = query('.args')[0]
  return 'import ' + _.camelCase(path.basename(req.value, '.js')) + ' from ' + getRaw(req)
}, reqCode)

const log = console.log

test('replace 1', t => {
  log('code x', processed.x)

  t.is(processed.x, 'var a = 1 - 2')
})

test('replace 2', t => {
  log('code y', processed.y)
  t.is(processed.y, `import Abe from 'abe'`)
})
