## Operator

The function signature:

```js
(getRaw::(Node -> String), node::Node, query::(String -> [Node]), named::Object) -> String
```

The function has 4 optional parameters:

getRaw: a function which takes a node object and produces a string
node: the node that was matched (and is being replaced)
query: a function which queries using the same query engine as the original search, and using the matched node as the root
named: an object containing any named matches
You can call any code that you want, but you must return a string, and this string will be used as the replacement for the matched node.

An example:

```js
var processedCode = grasp.replace('squery', 'call[callee=#require]', function(getRaw, node, query) {
    var req = query(".args")[0];
    return "import " + camelize(path.basename(req.value, ".js")) + " from " + getRaw(req);
}, code);
```