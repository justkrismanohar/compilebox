const write = require("write");

class OutputManager{
    
    constructor(filename){
        this.buffer = "";
    }

    output(str){
        this.buffer+=str+"\n";
        console.log(str);
    }

    dump(filename){
        write(filename, this.buffer, err=>{
            if(err)console.log(err);
        });
    }
}

module.exports =  new OutputManager();