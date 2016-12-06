import test from 'ava'
import grasp from 'grasp'

let code = `class CoolGang {
  cool(x) {
    console.log(x)
  }
}`

const log = console.log

const find = 'class-dec[id=#CoolGang]'
const replace = `import x from 'x'
{{}}`

const replacer = grasp.replace('squery', find, replace)

let result = replacer(code)

test('add import before class', t => {
  log('ADD IMPORT result::', result)
  t.regex(result, /import x/, 'import x added before class declaration')
})
