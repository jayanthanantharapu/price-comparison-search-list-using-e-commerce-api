var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var router = express.Router();
var request = require('request');

var inputui,ftitle,famt,fprodurl;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// here server request is calling
var fheaders = {
    'Fk-Affiliate-Id': 'jayanindi',
    'Fk-Affiliate-Token': '08e1fa01a4944146b0ef37cd349e8dc9'
};

// flipkart request 
app.post('/fgetData', function(req, res) { 
  console.log("search input from ui : "+req.body[0].value);
  inputui = req.body[0].value;

  var furlreq = 'https://affiliate-api.flipkart.net/affiliate/search/json?query='+inputui+'&resultCount=10';

  foptions = {
    url: furlreq,
    headers: fheaders
  };
  request(foptions,function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('flipkart request send');
      var ffContent=JSON.parse(body);
      console.log(ffContent.productInfoList.length);  

        ftitle=ffContent.productInfoList[0].productBaseInfo.productAttributes.title;
        famt=ffContent.productInfoList[0].productBaseInfo.productAttributes.sellingPrice.amount;
        fprodurl=ffContent.productInfoList[0].productBaseInfo.productAttributes.productUrl;
        console.log('flipkart title : '+ftitle+'flipkart product amount : '+famt+'flipkart prod url : '+fprodurl);
        var fresdata = {ftitle:ftitle , famt:famt , fprodurl:fprodurl};
        res.send(fresdata);
      
      
    }
    else{
    console.log('flipkart request doesnt send');
    }
  });

});

// ebay request 
app.post('/egetData', function(req, res){
  console.log("search input from ui : "+req.body[0].value);
  inputui = req.body[0].value;

  eoptions = {
    url: 'http://open.api.ebay.com/shopping?version=713&appid=JayanthA-7437-4720-bad7-e5fb6aba2b67&callname=FindPopularItems&QueryKeywords='+inputui+'&ResponseEncodingType=JSON',
  };

  request(eoptions,function(error,response,body){
    if(!error && response.statusCode==200){
      console.log('ebay request Sent');
      var jsonContent=JSON.parse(body);
      etitle=jsonContent.ItemArray.Item[0].Title;
      eamt = jsonContent.ItemArray.Item[0].ConvertedCurrentPrice.Value;
      eprodurl = jsonContent.ItemArray.Item[0].ViewItemURLForNaturalSearch;
      console.log('ebay title : '+etitle+'ebay product amount : '+eamt+'ebay prod url : '+eprodurl);
      var eresdata = {etitle:etitle , eamt:eamt , eprodurl:eprodurl};
      res.send(eresdata);
    }
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
