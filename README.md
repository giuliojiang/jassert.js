# jassert.js

General purpose `Node.js` assert library.

## Non-throwing

Errors do not cause execution to stop, but are recorded in internal statistics and printed to the console.

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
jassert.assert_equal({hello: "world"}, {hello: "world"}); // fails
jassert.assert_equal_deep({hello: "world"}, {hello: "world"}); // passes
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
