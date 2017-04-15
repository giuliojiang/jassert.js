module.exports.assert_true = function(term, stats) {
    if (!term) {
        stats["fail"] += 1;
    } else {
        stats["pass"] += 1;
    }
};

module.exports.assert_equal = function(expected, actual, stats) {
    var res = false;
    
    if ((typeof expected === 'object') && (typeof actual === 'object')) {
        var expectedJ = JSON.stringify(expected, Object.keys(expected).sort());
        var actualJ = JSON.stringify(actual, Object.keys(actual).sort());
        res = expectedJ === actualJ;
    } else {
        res = expected == actual;
    }
    
    if (res) {
        stats["pass"] += 1;
    } else {
        stats["fail"] += 1;
    }
};
