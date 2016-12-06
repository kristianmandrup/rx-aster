import test from 'ava'
import grasp from 'grasp'

const log = console.log

let code = `import x from 'x';`

const find = `import-dec! import-default-specifier[local=#x]`
const replace = `import y from {{.source}}`

const replacer = grasp.replace('squery', find, replace)

const result = replacer(code)

test('rename import', t => {
  log('RENAME IMPORT result::', result)
  t.regex(result, /import y/, 'renamed import to y')
})
