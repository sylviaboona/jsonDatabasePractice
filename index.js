var fs = require('fs')
var data = fs.readFileSync('addressBook.json');
var names = JSON.parse(data);
console.log(names);

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/add/:name/:contact?', addName)
function addName(req, res){
    var data = req.params;
    var name = data.name;
    var contact = data.contact;
    contact[name] = contact;

    if(!contact){
        var reply = {
            msg: 'Contact is required'
        }
        res.send(reply)
    } else{
        names[name] = contact;
        var data = JSON.stringify(names, null, 2)
        fs.writeFile('addressBook.json', data, finished);
        function finished(err){
            console.log('all set..');
            var reply = {
                name: name,
                contact: contact,
                msg: 'Thank you for your input',
                status: 'success'
            }
            res.send(reply)
        }
    }
   
}

app.get('/all', sendAll);
function sendAll(req, res){
    res.send(names);
}

function sayHello(){
    console.log('Hello');
}
app.get('/search/:name/', searchName);
function searchName(req, res){
    sayHello()
    var name = req.params.name;
    var reply;
    if(names[name]){
        reply = {
            status: "found",
            name: name,
            contact: names[name]
        }
    } else{
        reply = {
            status: "not found",
            name: name,
        }
    }
    res.send(reply);
}

var server = app.listen(3000, listening);
function listening(){
    console.log('listening on port 3000....');
}

// module.exports = router;