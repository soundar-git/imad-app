var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'Article-one': {
        title: 'Article One | Soundar',
        heading: 'Article One',
        date: 'Sep 21, 2017',
        content: `
             <p>
                   This is the content for my first article - 1a
               </p>
               <p>
                   This is the content for my first article - 1b
               </p>
               <p>
                   This is the content for my first article - 1c
               </p>`        
    },
    'Article-two': {
        title: 'Article Two | Soundar',
        heading: 'Article Two',
        date: 'Sep 22, 2017',
        content: `
                   <p>
                   This is the content for my second article - 2a
               </p>
               <p>
                   This is the content for my second article - 2b
               </p>
               <p>
                   This is the content for my second article - 2c
               </p>`    
    },
    'Article-three': {
        title: 'Article Three | Soundar',
        heading: 'Article Three',
        date: 'Sep 23, 2017',
        content: `
                       <p>
                   This is the content for my 3rd article - 3a
               </p>
               <p>
                   This is the content for my 3rd article - 3b
               </p>
               <p>
                   This is the content for my 3rd article - 3c
               </p>`
        
    }
}

function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width-device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
           <h3>
               ${heading}
           </h3> 
           <div>
               ${date}
           </div>
           <div>
                ${content}
           </div>
       </div>
    </body>
</html>`;
return htmlTemplate;
}

app.get('/:articleName',function(req,res) {
    // articleName == article-one
    // articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//app.get('/Article-one',function(req,res) {
    //res.sendFile(path.join(__dirname,'ui','article-one.html'))
//});

//app.get('/Article-two',function(req,res) {
    //res.sendFile(path.join(__dirname,'ui','article-two.html'))
//});

//app.get('/Article-three',function(req,res) {
    //res.sendFile(path.join(__dirname,'ui','article-three.html'))
//});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
