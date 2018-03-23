const equal = require('deep-equal');
const table = require('console.table');

const source = process.argv.length > 2 ? process.argv[2] : './src';
const merger = require(source+"/merger.js");
let writer = require("./output");

let REPORT = {}

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
    try {
        answer = fun(...params);
    } catch (e) {
        answer = e;
    }
    return function (solution) {
        if (equal(answer, solution)) {
            writer.output(fun.name + " test passed!");
            REPORT[fun.name]=true;
        }
        else {
            writer.output(fun.name + "test failed! output: ", answer, "expected ", solution);
            REPORT[fun.name] = false;
        }
    }
}

test(
    merger.mergeHandler, 
    ["John", "Kat", "Will", "Perry", "Liza"], 
    ["Smith", "Bowman", "Joeseph", "Platty", "Ann"], 
    (item1, item2)=>{return item1+" "+item2}
)(['John Smith','Kat Bowman','Will Joeseph','Perry Platty','Liza Ann']);

test(merger.merge2Object)(
    [{ firstname: 'John', lastname: 'Smith' },
    { firstname: 'Kat', lastname: 'Bowman' },
    { firstname: 'Will', lastname: 'Joeseph' },
    { firstname: 'Perry', lastname: 'Platty' },
    { firstname: 'Liza', lastname: 'Ann' } ]
)

test(merger.merge2Single)(
    ['John Smith',
        'Kat Bowman',
        'Will Joeseph',
        'Perry Platty',
        'Liza Ann']
)

printReport();
writer.output(JSON.stringify(REPORT));
writer.dump("usercode/logfile.txt")

