module.exports.verbose = true;

var println = function(m) {
    if (module.exports.verbose) {
        console.log(m);
    }
};

module.exports.assert_true = function(term, stats) {
    if (!term) {
        stats["fail"] += 1;
        println(new Error("Unit test assert_true failure"));
    } else {
        stats["pass"] += 1;
    }
};

module.exports.assert_equal = function(expected, actual, stats) {
    var res = false;
    var expectedS = expected;
    var actualS = actual;
    
    if ((typeof expected === 'object') && (typeof actual === 'object')) {
        var expectedS = JSON.stringify(expected, Object.keys(expected).sort());
        var actualS = JSON.stringify(actual, Object.keys(actual).sort());
        res = expectedS === actualS;
    } else {
        res = expected == actual;
    }
    
    if (res) {
        stats["pass"] += 1;
    } else {
        stats["fail"] += 1;
        println("\nExpected: " + expectedS);
        println("Actual: " + actualS);
        println(new Error("Unit test assert_equal failure"));
    }
};

// return: a string containing information about tests run
module.exports.format_stats = function(stats) {
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
module.exports.all_tests_passed = function(stats) {
    return stats["fail"] == 0;
}
