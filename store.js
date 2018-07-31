
var fs = require('fs');
var path = require('path');
var file_name = "store.json";
var full_path = path.join(__dirname, file_name);
let key_found = false;
var args = process.argv;
if (fs.existsSync(full_path)) {
 var file_data = read_file(file_name);

 switch (args[2]) {
  case 'add':
   add(args[3], args[4]);
   break;
  case 'list':
   list();
   break;
  case 'get':
   get(args[3]);
   break;
  case 'remove':
   remove(args[3]);
   break;
  case 'clear':
   clear();
   break;
  default:
   console.log('Invalid argument: add, list, get, remove');
 }

} else {
 console.log("file not found");
}




function read_file(file_name) {
 var data = fs.readFileSync(file_name, 'utf8');
 return JSON.parse(data);

}

function write_file() {
 fs.writeFileSync(file_name, JSON.stringify(file_data));
}

function add(key, value) {
 get(key);
 if (key_found) {
  console.log('Error! duplicate key ');

 } else {
  file_data.push({
   'key': key,
   'value': value
  });
  write_file();
  console.log('add done');
 }

}


function list() {
 if (file_data[0] == undefined) {
  console.log("file is empty you can add using cmmand 'node sroe add myKey myValue'");
 } else {

  file_data.forEach(function(element) {
   console.log(element['key'] + ' ' + element['value']);
  });
 }
}

function get(key) {
 file_data.forEach(function(element) {
  if (element['key'] === key) {
   console.log(element['key'] + ' ' + element['value']);
   key_found = true;
  } else {
   console.log('this key not found');
   key_found = false;
  }
 });
}

function remove(key) {

 file_data.forEach(function(element, index) {
  if (element['key'] === key) {
   file_data.splice(index, 1);
   console.log('remove done');

  } else {
   console.log('this key not found');

  }
 });
 write_file();
}

function clear() {
 file_data = [];
 write_file();
 console.log('clear done');
}