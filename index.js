module.exports.verbose = true;

var println = function(m) {
    if (module.exports.verbose) {
        console.log(m);
    }
};

var stats = null;

module.exports.reset = function() {
    stats = {
        "pass": 0,
        "fail": 0
    };
    module.exports.stats = stats;
};
module.exports.reset();

var assert = require("assert");

module.exports.assert_true = function(term) {
    if (!term) {
        stats["fail"] += 1;
        println(new Error("Unit test assert_true failure"));
    } else {
        stats["pass"] += 1;
    }
};

module.exports.assert_equal = function(expected, actual) {

    if (expected == actual) {
        stats["pass"] += 1;
    } else {
        stats["fail"] += 1;
        println("\nExpected: " + JSON.stringify(expected));
        println("Actual: " + JSON.stringify(actual));
        println(new Error("Unit test assert_equal failure"));
    }

};

// Deep equal is handled by the `assert` library
module.exports.assert_equal_deep = function(expected, actual) {
    try {
        assert.deepEqual(actual, expected);
    } catch (err) {
        // Fail
        stats["fail"] += 1;
        println("\nExpected: " + JSON.stringify(expected));
        println("Actual: " + JSON.stringify(actual));
        println(new Error("Unit test assert_equal_deep failure"));
        return;
    }
    
    // Pass
    stats["pass"] += 1;
    return;
};

// return: a string containing information about tests run
module.exports.format = function() {
    var s = "";
    s += "PASSED "+ stats["pass"] +" tests\n";
    if (stats["fail"] > 0) {
        s += "FAILED " + stats["fail"] + " tests\n";
        return s;
    } else {
        s += "ALL TESTS PASSED\n";
        return s;
    }
}

// return: true iff no tests failed
module.exports.all_tests_passed = function() {
    return stats["fail"] == 0;
}
