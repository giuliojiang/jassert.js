var async = require("async");

var jassert = require(__dirname + "/index.js");
jassert.verbose = false;

async.waterfall([
    function(callback) {
        try {

            var stats = jassert.stats;
            
            // Assert true tests
            
            var t = true;
            var f = false;
            
            if (!jassert.all_tests_passed()) {
                throw new Error("tests should all be fine");
            }
            
            jassert.assert_true(t);
            if (stats["pass"] != 1) {
                throw new Error("expected a pass");
            }
            
            jassert.assert_true(t);
            if (stats["pass"] != 2) {
                throw new Error("expected a pass");
            }
            if (stats["fail"] != 0) {
                throw new Error("expected no fails");
            }
            
            jassert.assert_true(f);
            if (stats["pass"] != 2) {
                throw new Error("expected no additional pass");
            }
            if (stats["fail"] != 1) {
                throw new Error("expected 1 fail");
            }
            
            // Object and String equality tests
            
            var o = {hello: "hello", world: "world"};
            var o2 = {world: "world", hello: "hello"};
            var o3 = {hello: "NOTworld"};
            var s = "hi";
            var s2 = "hi";
            var s3 = "hi ";
            
            jassert.assert_equal(o, o);
            if (stats["pass"] != 3) {
                throw new Error("expected 3 pass");
            }
            if (stats["fail"] != 1) {
                throw new Error("expected 1 fail");
            }
            
            jassert.assert_equal(o, s);
            if (stats["pass"] != 3) {
                throw new Error("expected 3 pass");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(o, o2);
            if (stats["pass"] != 4) {
                throw new Error("expected o and o2 to be equal");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(s, s2);
            if (stats["pass"] != 5) {
                throw new Error("expected s and s2 to be equal");
            }
            if (stats["fail"] != 2) {
                throw new Error("expected 2 fail");
            }
            
            jassert.assert_equal(s, s3);
            if (stats["pass"] != 5) {
                throw new Error("expected 5 pass");
            }
            if (stats["fail"] != 3) {
                throw new Error("expected s and s3 to be different");
            }
            
            jassert.assert_equal(o, o3);
            if (stats["pass"] != 5) {
                throw new Error("expected 5 pass");
            }
            if (stats["fail"] != 4) {
                throw new Error("expected o and o3 to be different");
            }
            
            // Formatting and reporting tests
            
            if (jassert.all_tests_passed()) {
                throw new Error("there should be failed tests");
            }
            
            if (jassert.format() != "PASSED 5 tests\nFAILED 4 tests\n") {
                throw new Error("wrong string formatting");
            }
            
            // Deep equal tests
            var deep_object_1 = {
                a: "hello",
                b: {
                    x: "xxx",
                    y: [1, 2]
                }
            };
            var deep_object_2 = {
                a: "hello",
                b: {
                    y: [1, 2],
                    x: "xxx"
                }
            };
            var deep_object_3 = {
                a: "hello",
                b: {
                    y: [1, 2, 3],
                    x: "xxx"
                }
            };
            
            jassert.assert_equal_deep(deep_object_1, deep_object_2);
            if (stats["pass"] != 6) {
                throw new Error("pass check");
            }
            if (stats["fail"] != 4) {
                throw new Error("fail check");
            }
            
            jassert.assert_equal_deep(deep_object_2, deep_object_1);
            if (stats["pass"] != 7) {
                throw new Error("pass check");
            }
            if (stats["fail"] != 4) {
                throw new Error("fail check");
            }
            
            jassert.assert_equal_deep(deep_object_1, deep_object_3);
            if (stats["pass"] != 7) {
                throw new Error("pass check");
            }
            if (stats["fail"] != 5) {
                throw new Error("fail check");
            }
            
            // Array tests
            var array_1 = [1,2,3];
            var array_2 = [1,2,3];
            var array_3 = [1,1,3];
            
            jassert.assert_equal(array_1, array_2);
            if (stats["pass"] != 8) {
                throw new Error("pass check");
            }
            if (stats["fail"] != 5) {
                throw new Error("fail check");
            }
            
            jassert.assert_equal(array_1, array_3);
            if (stats["pass"] != 8) {
                throw new Error("pass check");
            }
            if (stats["fail"] != 6) {
                throw new Error("fail check");
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
