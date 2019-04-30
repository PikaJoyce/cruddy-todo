const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// exports.dataDir = path.join(__dirname, 'data');
//     ./data/0001.txt

//  

exports.create = (text, callback) => {

  //console.log(location)
  counter.getNextUniqueId((err,id) => {
    //need to have error ok???????????
    //ni xu yao error
    items[id] = text;

    var location = path.join(exports.dataDir, `${id}.txt`);
    fs.writeFile(location, text, (err) => {
      if(err){
        callback(err);
      } else {
        callback(null, {id, text})
      }
    });
  })
}
//var location = path.join(exports.dataDir, `${id}.txt`);

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if(err){
      callback(err)
    } else {
      var data = _.map(files, (file,text, id) => {
         id = file.slice(0, -4);
         text = id;
         return {id, text};
        })
        callback(null, data);
      }
  })
}

exports.readOne = (id, callback) => {
  var location = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(location, (err, data) => {
    if(err){
      callback(err);
    } else {
      var todo = {id, text: data.toString()}
     
      callback(null, todo)
    }
  })
};

exports.update = (id, text, callback) => {

  var location = path.join(exports.dataDir, `${id}.txt`);
  fs.access(location, (err) => {
    if(err){
      callback(err)
    } else {
      fs.writeFile(location, text, (err) => {
        if(err){
          callback(err);
        } else {
          callback(null, {id, text})
        }
      });
    }
  })
  
}


exports.delete = (id, callback) => {
  var location = path.join(exports.dataDir, `${id}.txt`);
  fs.unlink(location, (err) => {
    if(err){
      callback(err);
    } else {
      callback(location);
    }
  })
ß
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
