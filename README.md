# jassert.js
Simple Node.js assert library compatible with my personal testsuites

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

Reset state
```
jassert.reset();
```

Disable automatic stacktrace for failed tests
```
jassert.verbose = false;
```
