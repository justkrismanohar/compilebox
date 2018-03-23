const equal = require('deep-equal');
const table = require('console.table');
let writer = require("./output");

const source = process.argv.length > 2 ? process.argv[2] : './src';
const util = require(source + "/util.js");

let REPORT = {
    generateEven: 0,
    getSize:0,
    addTo:0,
    enqueue:0,
    dequeue:0,
    addToObj:0,
    sort:0,
    flatten:0
}

/**
 * @description Prints the REPORT as a table
 */
function printReport() {
    let arr = [];
    for (let test in REPORT) {
        arr.push([test, REPORT[test]]);
    }
    console.table(["Test", "Result"], arr);
}


function test(fun, ...params) {
    let answer;
    try{
        answer = fun(...params);
    }catch(e){
        answer = e;
    }
    return function (solution) {
        if (equal(answer, solution)) {
            writer.output(fun.name+" test passed!");
            REPORT[fun.name]++;
        }
        else writer.output(fun.name +"test failed! output: ", answer, "expected ", solution);
    }
}

test(util.generateEven, 5)([0, 2, 4])
test(util.generateEven, 0)([])
test(util.generateEven, 100)([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98])

test(util.getSize, {foo: "bar", kek:"lol"})(2);
test(util.getSize, [1, 3])(2);
test(util.getSize, [{ foo: "bar"},{kek:"lol"}])(2);

test(util.addTo, [1, 2], 3, "front")([3, 1, 2])
test(util.addTo, [1, 2], 3, "back")([1, 2, 3])
test(util.addTo, [1, 2], 3, "front")([3, 1, 2])

test(util.enqueue, [1,2,3], 4)([1,2,3,4])
test(util.enqueue, ["a", { pop: 0 }, 1], { lel: 1 })(["a", { pop: 0 }, 1, { lel: 1 }])
test(util.enqueue, [0, { lel: 1 }], { lel: 1 })([0, { lel: 1 }, { lel: 1 }])

test(util.dequeue, [1, 2, 3])(1)
test(util.dequeue, [])(null||undefined)
test(util.dequeue, [1])(1)

test(util.addToObj, {}, "kek", "lol")({"kek":"lol"})
test(util.addToObj, {"kek":"lel"}, "kek", "lol")({ "kek": "lol" })
test(util.addToObj, {"name":"rick"}, "age", 0)({ "name": "rick", "age":0 })

test(util.sort, [1, 2, 3, 4, 5])([1, 2, 3, 4, 5])
test(util.sort, [5, 4, 3, 2, 1])([1, 2, 3, 4, 5])
test(util.sort, [1,2])([1,2])

test(util.flatten, { "age": 10, "name": "Steve", "height": 11 })("age:10,name:Steve,height:11," || "age:10,name:Steve,height:11")
test(util.flatten, { })("");
test(util.flatten, { "age": 10 })("age:10," || "age:10")

printReport();
writer.output(JSON.stringify(REPORT));
writer.dump("usercode/logfile.txt")
