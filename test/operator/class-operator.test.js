import { ClassOperator } from '../operator'
import test from 'ava'

const codeWithClass = `class Hello {
  cool(x) {
    console.log(x)
  }
}`

const newOp = function (code) {
  return new ClassOperator({ code: code || '' })
}

const prefix = 'ClassOperator::'
const type = 'class'
const title = function (name) {
  return `${prefix} add ${type}`
}

test(title('add'), t => {
  const op = newOp()
  op.add({name: 'Hello'})
  t.regex(op.code, /class Hello/, 'added class Hello')
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