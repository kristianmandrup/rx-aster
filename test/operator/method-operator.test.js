import { operator } from '../../'
import test from 'ava'

const codeWithClass = `class Hello {
  cool(x) {
    console.log(x)
  }
}`

const newOp = function (code) {
  return new operator.MethodOperator({ code: code || '' })
}

const prefix = 'MethodOperator::'
const type = 'method'
const title = function (name) {
  return `${prefix} add ${type}`
}

test(title('add'), t => {
  const op = newOp()
  op.add({name: 'hello'})
  t.regex(op.code, /hello\(/, 'added method hello')
})

test(title('remove'), t => {
  const op = newOp(codeWithClass)
  op.remove({name: 'Hello'})
  t.notRegex(op.code, /hello\(/, 'removed method hello')
})

test(title('rename'), t => {
  const op = newOp(codeWithClass)
  op.rename({name: 'Hello', to: 'Goodbye'})
  t.notRegex(op.code, /hello\(/, 'removed method hello')
  t.regex(op.code, /goodbye\(/, 'added method goodbye')
})
