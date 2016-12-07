import { operator } from '../../'
import test from 'ava'

const codeWithClass = `class Hello {
  cool(x) {
    console.log(x)
  }
}`

const log = console.log

// log('operator', operator)

const newOp = function (code) {
  return new operator.ClassOperator({ code: code || '' })
}

const prefix = 'ClassOperator::'
const type = 'class'
const title = function (name) {
  return `${prefix} ${name} ${type}`
}

test(title('add'), t => {
  let op = newOp()
  log('op', op)
  op.add({name: 'Winner'})
  log('result code', op.code)
  t.regex(op.code, /class Winner/, 'added class Winner')
})

test(title('remove'), t => {
  const op = newOp(codeWithClass)
  op.remove({name: 'Hello'})
  t.notRegex(op.code, /class Hello/, 'removed class Hello')
})

test(title('rename'), t => {
  const op = newOp(codeWithClass)
  op.rename({name: 'Hello', to: 'Goodbye'})
  t.notRegex(op.code, /class Hello/, 'removed class Hello')
  t.regex(op.code, /class Goodbye/, 'added class Goodbye')
})
