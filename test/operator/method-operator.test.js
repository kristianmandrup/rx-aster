import { operator } from '../../'
import test from 'ava'

const codeWithClass = `class Hello {
  cool(x) {
    console.log(x)
  }

  hello(x) {
    console.log('hi')
  }
}`

const log = console.log

const newOp = function (code) {
  return new operator.MethodOperator({ code: code || '' })
}

const prefix = 'MethodOperator::'
const type = 'method'
const title = function (name) {
  return `${prefix} ${name} ${type}`
}

// test(title('add'), t => {
//   const op = newOp(codeWithClass)
//   log('op', op)
//   op.where({className: 'Hello'})
//   op.add({name: 'wasAdded'})
//   log('result code: ADD', op.code)

//   t.regex(op.code, /wasAdded \(/, 'added method wasAdded')
// })

test(title('remove'), t => {
  const op = newOp(codeWithClass)
  op.remove({name: 'hello'})
  t.notRegex(op.code, /hello\(/, 'removed method hello')
})

test(title('rename'), t => {
  const op = newOp(codeWithClass)
  op.rename({name: 'hello', to: 'goodbye'})
  t.notRegex(op.code, /hello \(/, 'removed method hello')
  t.regex(op.code, /goodbye \(/, 'added method goodbye')
})
