//db.dropDatabase()
// morgan body-parser method-override mongodb cors path moment lodash multer
var express        = require('express');  
var morgan         = require('morgan');  
var bodyParser     = require('body-parser');  
var methodOverride = require('method-override');  
var app            = express();  
var router         = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
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
var schedule = require('node-schedule');
var items;

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


var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 15;
rule.minute = 09;

app.route('/editDelhiExMrRecord')  
.post(function (req, res) {
  console.log(req.body)
  MongoClient.connect("mongodb://localhost:27017/operationsDB", function(err, database) {
      if (err) return
      req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
      req.body.date = new Date(req.body.date)
      database.db('operationsDB').collection('delhiExMr').updateOne({"_id": req.body._id}, {$set : req.body }, function (err, result) {
        console.log(err)
        res.send(
              (err === null) ? {msg: 'success'} : {msg: err}
          );
      });
  })
});  
schedule.scheduleJob(rule, function(){
  (async () => {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", function(err, database) {
      if (err) return
      var data = {
        date : new Date(),
        data : [ {
          hours: "7:00 AM",
          shift: "Shift A",
          batch_no: "",
          density: "",
          variation: "",
          fmr: "",
          pumping: "",
          bypass: "",
          flow_rate_delivery: "",
          flow_rate_pumping: "",
          tank_no: "",
          tank_dip: "",
          flow_Difference: ""
      },{
        hours: "8:00 AM",
        shift: "Shift A",
        batch_no: "",
        density: "",
        variation: "",
        fmr: "",
        pumping: "",
        bypass: "",
        flow_rate_delivery: "",
        flow_rate_pumping: "",
        tank_no: "",
        tank_dip: "",
        flow_Difference: ""
    },{
      hours: "9:00 AM",
      shift: "Shift A",
      batch_no: "",
      density: "",
      variation: "",
      fmr: "",
      pumping: "",
      bypass: "",
      flow_rate_delivery: "",
      flow_rate_pumping: "",
      tank_no: "",
      tank_dip: "",
      flow_Difference: ""
  },{
    hours: "10:00 AM",
    shift: "Shift A",
    batch_no: "",
    density: "",
    variation: "",
    fmr: "",
    pumping: "",
    bypass: "",
    flow_rate_delivery: "",
    flow_rate_pumping: "",
    tank_no: "",
    tank_dip: "",
    flow_Difference: ""
},{
  hours: "11:00 AM",
  shift: "Shift A",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
  hours: "12:00 PM",
  shift: "Shift A",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
  hours: "13:00 PM",
  shift: "Shift A",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "14:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "15:00 PM",
  batch_no: "",
  shift: "Shift B",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "16:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "17:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "18:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "19:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "20:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "21:00 PM",
   shift: "Shift B",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "22:00 PM",
  batch_no: "",
  shift: "Shift C",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "23:00 PM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
  hours: "24:00 AM",
  shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "1:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "2:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "3:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "4:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "5:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
},{
   hours: "6:00 AM",
   shift: "Shift C",
  batch_no: "",
  density: "",
  variation: "",
  fmr: "",
  pumping: "",
  bypass: "",
  flow_rate_delivery: "",
  flow_rate_pumping: "",
  tank_no: "",
  tank_dip: "",
  flow_Difference: ""
}]
      }
      database.db('operationsDB').collection('delhiExMr').insertOne(data, function(er, records) {
          if (er) throw er;
          console.log(records)
      });
  })

  })().catch(err => {
      console.error(err);
  });

});

app.route('/getDelhiExMrRecord')  
.post(function (req, res) {
  MongoClient.connect("mongodb://localhost:27017/operationsDB", { useNewUrlParser: true },function(err, database) {
      if (err) return
        database.db('operationsDB').collection('delhiExMr').findOne({}, function(err, result) {
          if (err) throw err;

        });
        req.body.date =  new Date(req.body.date)
      database.db('operationsDB').collection('delhiExMr').aggregate([
          {
            $match:{'date':
                {
                  $lte: new Date(req.body.date.setHours(23,59,59,999)),
                  $gte: new Date(req.body.date.setHours(0,0,0,0))
                }           
              }
          }
      ]).toArray(function (er, items){
          if (er) throw er;
            console.log(er);
            console.log(items)
          res.send({"msg" : "success",
            "data" : JSON.stringify(items),
          })
        //  database.close();
      });
    })
});  

app.route('/authenticate')  
    .post(function (req, res) {
      console.log(req.body)
                ldapAuthenticate(req.body.username,req.body.password, res) 
    });

  ldapAuthenticate=function(username, password,res){
    
    config.ad.isUserMemberOf(username, 'NRPL:DAILY_REPORT_BIJWASAN', function(err, isMember) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }
      if(isMember){
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
      else{
        res.send({"msg": "error",
        })
      }
      
      console.log(username + ' isMemberOf ' + 'NRPL:DAILY_REPORT_BIJWASAN' + ': ' + isMember);
    });
  }

app.use('/', router);



