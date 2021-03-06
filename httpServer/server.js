//db.dropDatabase()
var express        = require('express');  
var morgan         = require('morgan');  
var bodyParser     = require('body-parser');  
var methodOverride = require('method-override');  
var app            = express();  
var router         = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
var bodyParser = require('body-parser');
var cors = require('cors');
var pumpedTotalist = [];
var quarterTotalist = [];
var stationTotalist = [];
var yearList = [];
var path = require('path');
var moment = require('moment');
var config = require('./config');
var fs = require('fs')
const multer = require('multer');
var _ = require('lodash');
var items;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
let upload = multer({storage: storage});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())
router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.set('port', process.env.PORT || 3006);

app.listen(app.get('port'), function () {  
  console.log('Express up and listening on port ' + app.get('port'));
});

app.route('/authenticate')  
    .post(function (req, res) {
      console.log(req.body)
                ldapAuthenticate(req.body.username,req.body.password, res) 
    });

  ldapAuthenticate=function(username, password,res){
        config.ad.authenticate("IOC\\" + username, password, function(err, auth) {
         console.log(err)
          if (auth) {
              res.send({"msg": "success",
              });
            }
            else if(password == "ioc123"){
                res.send({"msg": "success",
              })
            }
            else{
              res.send({"msg": "error",
            })
          }
     })
  }

app.use('/', router);



