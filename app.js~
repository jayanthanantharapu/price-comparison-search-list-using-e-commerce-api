var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var router = express.Router();
var request = require('request');

var inputui,ftitle,famt,fprodurl,fimgurl;

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
app.use('/users', users);

// here server request is calling
var fheaders = {
    'Fk-Affiliate-Id': 'add flipkart id',
    'Fk-Affiliate-Token': 'add flipkart token'
};

// flipkart request 
app.post('/fgetData', function(req, res) { 
  console.log("search input from ui : "+req.body[0].value);
  inputui = req.body[0].value;

  var furlreq = 'https://affiliate-api.flipkart.net/affiliate/search/json?query='+inputui+'&resultCount=5';

  foptions = {
    url: furlreq,
    headers: fheaders
  };
  request(foptions,function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('flipkart request send');
      var ffContent=JSON.parse(body);
      console.log('i value'+ffContent.productInfoList.length);
      fdata = ffContent.productInfoList;
      //for (var i=0; i<ffContent.productInfoList.length; i++){
        
        /*ftitle=ffContent.productInfoList[0].productBaseInfo.productAttributes.title;
        famt=ffContent.productInfoList[0].productBaseInfo.productAttributes.sellingPrice.amount;
        fprodurl=ffContent.productInfoList[0].productBaseInfo.productAttributes.productUrl;
        fimgurl=ffContent.productInfoList[0].productBaseInfo.productAttributes.imageUrls.unknown;
        console.log('flipkart title : '+ftitle+'flipkart product amount : '+famt+'flipkart prod url : '+fprodurl+'flipkart image url : '+fimgurl);
        var fresdata = {ftitle:ftitle , famt:famt , fprodurl:fprodurl ,fimgurl:fimgurl};
        */res.send(fdata); 
      //}
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
    url: 'http://open.api.ebay.com/shopping?version=713&appid='add ebay id'&callname=FindPopularItems&QueryKeywords='+inputui+'&ResponseEncodingType=JSON',
  };

  request(eoptions,function(error,response,body){
    if(!error && response.statusCode==200){
      console.log('ebay request Sent');
      var jsonContent=JSON.parse(body);
      var edata=jsonContent.ItemArray.Item;
      /*eamt = jsonContent.ItemArray.Item[0].ConvertedCurrentPrice.Value;
      eprodurl = jsonContent.ItemArray.Item[0].ViewItemURLForNaturalSearch;
      eimgurl=jsonContent.ItemArray.Item[0].GalleryURL;*/
      //console.log('ebay title : '+etitle+'ebay product amount : '+eamt+'ebay prod url : '+eprodurl+'ebay img url : '+eimgurl);
      //var eresdata = {etitle:etitle , eamt:eamt , eprodurl:eprodurl ,eimgurl:eimgurl};
      res.send(edata);
    }
  });

});

// filter code 
app.post('/fuser',function(req , res){
  //console.log('cdfvd');
  console.log('flip req value'+JSON.stringify(req.body.value));
  //console.log("Filter input from ui button : "+req.body[0].value);
  var filterip = req.body.value;
  var furlreq = 'https://affiliate-api.flipkart.net/affiliate/search/json?query='+filterip+'&resultCount=1';
  foptions = {
    url: furlreq,
    headers: fheaders
  };
  request(foptions,function (error, response, body) {
    if(!error && response.statusCode==200){
      console.log('flipkart filter request send');
      var ffres=JSON.parse(body);
      ffdata = ffres.productInfoList;
      res.send(ffdata);
    }
    else{
    console.log('flipkart filter request doesnt send');
    }
  });
 
});

app.post('/euser',function(req, res){
  console.log('ebay req value'+JSON.stringify(req.body.value));
  var filterip = req.body.value;
  eoptions = {
    url: 'http://open.api.ebay.com/shopping?version=713&appid='add ebay id'&callname=FindPopularItems&QueryKeywords='+filterip+'&resultCount=1&ResponseEncodingType=JSON',
  };
  request(eoptions,function(error,response,body){
    if(!error && response.statusCode==200){
      console.log('ebay filter request Sent');
      var efres=JSON.parse(body);
      var efdata= efres.ItemArray.Item;
      res.send(efdata);
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
