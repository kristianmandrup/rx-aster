import test from 'ava'
const Rx = require('rx')
import aster from '../..'

test('aster', async t => {
  const sources = ['var a = 1', 'var b = a + 2']

  function srcObserver (options) {
    return Rx.Observable.of(options.sources)
  }

  const src = aster.src({
    srcObserver,
    sources
  })

  src
  .subscribe(aster.runner({
    onNext: (item) => {
      console.log('>> %s'.yellow, item)
    }
  }))
})
