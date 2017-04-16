# jassert.js
Simple `Node.js` assert library compatible with my personal testsuites

# Disambiguation

Maybe you were looking for `jassert` https://www.npmjs.com/package/jassert

# Examples

Install:

```
npm --save install jassert.js
```

Importing
```
var jassert = require("jassert.js");
```


Asserting true/false values
```
jassert.assert_true(true);
```

Asserting equality
```
jassert.assert_equal({hello: "world"}, {hello: "world"});
```

Getting result report
```
console.log(jassert.format());
```

Check if all tests passed
```
console.log(jassert.all_tests_passed());
```

Example output:
```
PASSED 5 tests
FAILED 4 tests
```

Reset state
```
jassert.reset();
```

Disable automatic stacktrace for failed tests
```
jassert.verbose = false;
```

# Object comparison

`jassert.js` compares objects in a semi-deep way:

all object keys in the first level will be compared in an ordered way, however it ignores the key ordering of all subsequent levels. Use `jassert.assert_equal_deep` if necessary.
