var async = require("async");

var jassert = require(__dirname + "/index.js");
jassert.verbose = false;

async.waterfall([
    function(callback) {
        try {
            var stats = {
                "pass": 0,
                "fail": 0
            };
            
            var t = true;
            var f = false;
            
            if (!jassert.all_tests_passed(stats)) {
                throw new Error("tests should all be fine");
            }
            
            jassert.assert_true(t, stats);
            if (stats["pass"] != 1) {
                throw new Error("expected a pass");
            }
            
            jassert.assert_true(t, stats);
            if (stats["pass"] != 2) {
                throw new Error("expected a pass");
            }
            if (stats["fail"] != 0) {
                throw new Error("expected no fails");
            }
            
            jassert.assert_true(f, stats);
            if (stats["pass"] != 2) {
                throw new Error("expected no additional pass");
            }
            if (stats["fail"] != 1) {
                throw new Error("expected 1 fail");
            }
            
            var o = {hello: "world"};
            var o2 = {hello: "world"};
            var o3 = {hello: "NOTworld"};
            var s = "hi";
            var s2 = "hi";
            var s3 = "hi ";
            
            jassert.assert_equal(o, o, stats);
            if (stats["pass"] != 3) {
                throw new Error("expected 3 pass");
            }
            if (stats["fail"] != 1) {
                throw new Error("expected 1 fail");
            }
            
            jassert.assert_equal(o, s, stats);
            if (stats["pass"] != 3) {
                throw new Error("expected 3 pass");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(o, o2, stats);
            if (stats["pass"] != 4) {
                throw new Error("expected o and o2 to be equal");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(s, s2, stats);
            if (stats["pass"] != 5) {
                throw new Error("expected s and s2 to be equal");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(s, s3, stats);
            if (stats["pass"] != 5) {
                throw new Error("expected 5 pass");
            }
            if (stats["fail"] != 3) {
                throw new Error("expected s and s3 to be different");
            }
            
            jassert.assert_equal(o, o3, stats);
            if (stats["pass"] != 5) {
                throw new Error("expected 5 pass");
            }
            if (stats["fail"] != 4) {
                throw new Error("expected o and o3 to be different");
            }
            
            if (jassert.all_tests_passed(stats)) {
                throw new Error("there should be failed tests");
            }
            
            if (jassert.format_stats(stats) != "PASSED 5 tests\nFAILED 4 tests\n") {
                throw new Error("wrong string formatting");
            }
            
        } catch (err) {
            callback(err);
            return;
        }
        callback(null);
        return;
    }
], function(err, res) {
    if (err) {
        console.log(err);
        console.log("SOME TESTS FAILED");
        process.exit(1);
    } else {
        console.log("ALL TESTS PASSED");
        process.exit(0);
    }
});
