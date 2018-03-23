

let generateEven = n => {
    let arr = [];
    for(let i=0; i<n; i+=2)
        arr.push(i)
    return arr;
}

let getSize = val => {
    if (val.constructor.name.toLowerCase() === "array" )return  val.length;
    if (val.constructor.name.toLowerCase() === "object")return Object.keys(val).length;
}

let addTo = (arr, item, pos) => {
    if(pos === "front")arr.unshift(item);
    if(pos === "back")arr.push(item);
    return arr;
}

let enqueue = (array, value)=>{
   array.push(value);
   return array;
}

let dequeue = (array)=>{
    return array.shift();
}

let addToObj =  (obj, index, value)=>{
    obj[index] = value;
    return obj;
}

let sort = (array, order="asc")=>{
    if(order === "asc")return array.sort();
    return array.sort().reverse();
}

let flatten = (obj)=>{
    let str = ""
    for(key in obj){
        str+=key+":"+obj[key]+","
    }
    return str;
}

module.exports = {
    generateEven: generateEven,
    getSize: getSize,
    addTo: addTo,
    enqueue: enqueue,
    dequeue: dequeue,
    addToObj : addToObj,
    sort: sort,
    flatten: flatten

}