import { ClassOperator } from '../operator'
import test from 'ava'

test('ClassOperator:: add class', t => {
  const op = new ClassOperator({ code: '' })
  op.add({name: 'Hello'})
  t.regex(op.code, /class Hello/, 'added class Hello')
})

const codeWithClass = `class Hello {
  cool(x) {
    console.log(x)
  }
}`

test('ClassOperator:: remove class', t => {
  const op = new ClassOperator({ code: codeWithClass })
  op.remove({name: 'Hello'})
  t.notRegex(op.code, /class Hello/, 'removed class Hello')
})

test('ClassOperator:: rename class', t => {
  const op = new ClassOperator({ code: codeWithClass })
  op.rename({name: 'Hello', to: 'Goodbye'})
  t.notRegex(op.code, /class Hello/, 'removed class Hello')
  t.regex(op.code, /class Goodbye/, 'added class Goodbye')
})
