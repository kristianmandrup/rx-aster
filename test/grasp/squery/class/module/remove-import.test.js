import test from 'ava'
import grasp from 'grasp'

const log = console.log

let code = `import x from 'x';
class CoolGang {
  cool(x) {
    console.log(x)
  }
}`

const find = `(import-dec! import-default-specifier[local=#x], class-dec[id=#CoolGang])`
const replace = `class {{.id}} {{.body}}`

const replacer = grasp.replace('squery', find, replace)

const result = replacer(code)

test('remove import sibling to specific class', t => {
  log('REMOVE IMPORT result::', result)
  t.notRegex(result, /import x/, 'import x removed before class declaration')
  t.regex(result, /class CoolGang/, 'class is kept')
})
