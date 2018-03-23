const equal = require('deep-equal');
const table = require('console.table');
const GenereSoln = require("./solutions/movieGenreSoln.js").Genre
const MovieSoln = require("./solutions/movieGenreSoln.js").Movie
let writer = require("./output");

const source = process.argv.length > 2 ? process.argv[2] : './src';

const Genre = require(source+"/movieGenre.js").Genre;
const Movie = require(source+"/movieGenre.js").Movie;

//can be empty or testcase name can be declared here
let REPORT = {
    "testMovieInstance": false,
    "testGenreInstance": false,
}

/**
 * @param {Object} testObj - object instantiated from students class
 * @param {Object} ansObj - onbject instantiated from solution class
 */
function instanceTest(testObj, ansObj){
    if(equal(testObj, ansObj)){
        REPORT[`test${testObj.constructor.name}Instance`]=true;
    }
    else REPORT[`test${testObj.constructor.name}Instance`] = false;
}

/**
 * @description Allows a test to be expressed as a block of code wrapped in try catch 
 * @param {Object} options
 * @param {string[]} options.pretests - Names of other tests in REPORT global which should have run ans passed before running this test
 * @param {string} options.name - The name of the testcase
 * @callback options.handler - programming logic of the test case
 * @returns {boolean} - result of test
 */
function behaviourTest({name, pretests, handler}){//objct destructuring
    try{
        if (pretests) {
            pretests.forEach(pretest => {
                if (!REPORT[pretest]) throw `pretest ${pretest} failed`;
            });
        }
        handler();
        REPORT[name] = true;
        return true;
    }catch(e){
        writer.output(e);
        REPORT[name] = false;
        return false;
    }
}

/**
 * @description Prints the REPORT as a table
 */
function printReport(){
    let arr=[];
    for(let test in REPORT){
        arr.push([test, REPORT[test]]);
    }
    console.table(["Test", "Result"], arr);
}

//testing constructor
instanceTest(new Genre(), new GenereSoln())
instanceTest(new Movie(), new MovieSoln())

//addRelated test case 1
behaviourTest({
    name:"addRelatedMovieTest",
    pretests: ["testMovieInstance", "testGenreInstance"],
    handler: ()=>{
        let genre = new Genre();
        let movie = new Movie();
        movie.title = "Bad Boys 2";
        let movie2 = new Movie();
        movie2.title= "Pineapple Express";
        if (movie.addRelatedMovie("not a movie obj") == true) throw "addRelatedMovieTest: non movie object added";//tests use of instanceof
        if (movie.addRelatedMovie(movie2) != true) throw "addRelatedMovieTest: True not returned";
        if (!equal(movie.related, [movie2])) throw "addRelatedMovieTest: Movie not added";
    }
})


behaviourTest({
    name:"setGenreTest",
    pretests: ["testMovieInstance", "testGenreInstance"],
    handler: () => {
        let genre = new Genre();
        let movie = new Movie();
        movie.title = "Bad Boys 2";
        genre.name ="Action";
        if (movie.setGenre("action") == true) throw "setGenreTest: Set genre accecepted non genre object";//test use of instanceof
        if (movie.setGenre(genre) != true) throw "setGenreTest: Set genre failed to return true";
        if (equal(movie.genres, [])) throw "setGenreTest: Genre not set";
        if(!equal(genre.movies, [movie]))throw "setGenreTest: Movie not stored in genre";
    }
})

behaviourTest({
    name: "addMovieTest",
    pretests: ["testMovieInstance", "testGenreInstance"],
    handler: () => {
        let genre = new Genre();
        let movie = new Movie();
        movie.title = "Bad Boys 2";
        genre.name = "Action";
        if (genre.addMovie("James Bond") == true) throw "addMovieTest: addMovie accecepted non movie object";
        if (genre.addMovie(movie) != true) throw "addMovieTest: addMovie failed to return true";
        if (!equal(genre.movies, [movie])) throw "addMovieTest: Movie not stored in genre";
    }
})
printReport();
writer.output(JSON.stringify(REPORT));
writer.dump("usercode/logfile.txt")
