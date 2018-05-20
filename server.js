
const express = require('express');
const exphbs = require('express-handlebars');

const http = require('http');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get ('/', function (req, res) {

    var queryString = req.query.term;
    var term = encodeURIComponent(queryString);

    const remoteAddress = req.connection.remoteAddress;

    console.log(`[GET] Request from ${remoteAddress}`)
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';


    http.get(url, function (response) {

        response.setEncoding('utf-8');

        var body = ''; 
        response.on('data', function(d) {
            body += d;
        });
         response.on('end', function(){
            var parsed = JSON.parse(body);
            res.render('home', {gifs: parsed.data})
         })
    })
}) 

app.listen(3000,function(){
  console.log("magic happens on port 3000...");
});
