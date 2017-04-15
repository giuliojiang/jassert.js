var async = require("async");

var jassert = require(__dirname + "/index.js");

async.waterfall([
    function(callback) {
        try {
            var stats = {
                "pass": 0,
                "fail": 0
            };
            
            var t = true;
            var f = false;
            
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
            var s = "hi";
            var o2 = {hello: "world"};
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
