//call vars
var fs = require(`fs`).promises;
//setting functions and class
    class File{
        constructor(dir){
            this.dir = dir;
        }
    }
    exports.getFile = (dir) => {
        return fs.readFile(dir)
    }
    exports.acessFile = (dir) => {
        return fs.access(dir, fs.constants.R_OK)
        .then(() => true).catch(() => false);
    }
    //export
    exports.File = new File;