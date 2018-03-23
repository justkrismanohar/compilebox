let first_names=["John", "Kat", "Will", "Perry", "Liza"];
let last_names=["Smith", "Bowman", "Joeseph", "Platty", "Ann"];

function mergeHandler(arr1, arr2, func){
    return arr1.map((ele, idx)=>{
        return func(arr1[idx], arr2[idx]);
    });
}

function merge2Single(){
    return mergeHandler(first_names, last_names, function(first, last){
        return first+" "+last;
    })
}

function merge2Object(){
    return mergeHandler(first_names, last_names, function (first, last) {
        return {firstname: first, lastname: last};
    })
}

module.exports = {
    mergeHandler: mergeHandler,
    merge2Object: merge2Object,
    merge2Single: merge2Single
}