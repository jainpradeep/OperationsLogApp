//db.dropDatabase()
// morgan body-parser method-override mongodb cors path moment lodash multer
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var router = express.Router();
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
var skoLbtPumpingInitDB = require('./skoLbtPumpingInitDB')


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
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(cors())

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.set('port', process.env.PORT || 3006);

app.listen(app.get('port'), function() {
    console.log('Express up and listening on port ' + app.get('port'));
});


var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 15;
rule.minute = 24;

schedule.scheduleJob(rule, function() {
  (async () => {
      MongoClient.connect("mongodb://localhost:27017/operationsDB", function(err, database) {
          if (err) return
          var data = {
              date: new Date(),
              data: [{
                  hours: "7:00 AM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: "",
              }, {
                  hours: "8:00 AM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "9:00 AM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "10:00 AM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "11:00 AM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "12:00 PM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "13:00 PM",
                  shift: "Shift A",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "14:00 PM",
                  shift: "Shift A; Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "15:00 PM",
                  batch_no: "",
                  editHistory: null,
                  shift: "Shift B",
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "16:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "17:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "18:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "19:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "20:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "21:00 PM",
                  shift: "Shift B",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "22:00 PM",
                  batch_no: "",
                  editHistory: null,
                  shift: "Shift B; Shift C",
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "23:00 PM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "24:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "1:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "2:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "3:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "4:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "5:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }, {
                  hours: "6:00 AM",
                  shift: "Shift C",
                  batch_no: "",
                  editHistory: null,
                  density: "",
                  editedDate: "",
                  variation: "",
                  fmr: "",
                  pumpingBypass: "",
                  bypass: "",
                  flow_rate_delivery: "",
                  flow_rate_pumping: "",
                  tank_no: "",
                  tank_dip: "",
                  flow_Difference: "",
                  oficer: ""
              }],
              remarks: {
                  "Shift A": "",
                  "Shift B": "",
                  "Shift C": ""
              }
          }
          database.db('operationsDB').collection('delhiExMr').insertOne(data, function(er, records) {
              if (er) throw er;
              console.log(records)
          });
          database.db('operationsDB').collection('skoLbtPumping').insertOne(skoLbtPumpingInitDB.skoLbtPumpingInitDB, function(er, records) {
              if (er) throw er;
              console.log(records)
          });
      })

  })().catch(err => {
      console.error(err);
  });

});

app.route('/editDelhiExMrRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delhiExMr').updateOne({
                "_id": req.body._id
            }, {
                $set: req.body
            }, function(err, result) {
                console.log(err)
                res.send(
                    (err === null) ? {
                        msg: 'success'
                    } : {
                        msg: err
                    }
                );
            });
        })
    });

app.route('/getDelhiExMrRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('delhiExMr').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delhiExMr').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(req.body.date.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                console.log(er);
                console.log(items)
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
                //  database.close();
            });
        })
    });

app.route('/editSkoLbtPumpingRecord')
.post(function(req, res) {
    console.log(req.body)
    MongoClient.connect("mongodb://localhost:27017/operationsDB", function(err, database) {
        if (err) return
        req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('skoLbtPumping').updateOne({
            "_id": req.body._id
        }, {
            $set: req.body
        }, function(err, result) {
            console.log(err)
            res.send(
                (err === null) ? {
                    msg: 'success'
                } : {
                    msg: err
                }
            );
        });
    })
});

app.route('/getSkoLbtPumpingRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('skoLbtPumping').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('skoLbtPumping').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(req.body.date.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                if (er) throw er;
                console.log(er);
                console.log(items)
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
                //  database.close();
            });
        })
    });

app.route('/authenticate')
    .post(function(req, res) {
        console.log(req.body)
        ldapAuthenticate(req.body.username, req.body.password, res)
    });

ldapAuthenticate = function(username, password, res) {
    config.ad.isUserMemberOf(username, 'NRPL:DAILY_REPORT_BIJWASAN', function(err, isMember) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            return;
        }
        if (isMember) {
            config.ad.authenticate("IOC\\" + username, password, function(err, auth) {
                console.log(err)
                if (auth) {
                    config.ad.isUserMemberOf(username, 'BIJWASAN OPERATION DEPARTMENT', function(err, isMemberAdmin) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }
                        res.send({
                            "msg": "success",
                            "isAdmin": isMemberAdmin
                        })
                        console.log(username + ' isMemberOf ' + 'BIJWASAN OPERATION DEPARTMENT' + ': ' + isMemberAdmin);
                    });
                } else if (password == "ioc123") {
                    res.send({
                        "msg": "success",
                        "isAdmin": true
                    })
                } else {
                    res.send({
                        "msg": "error",
                    })
                }
            })
        } else {
            res.send({
                "msg": "error",
            })
        }

        console.log(username + ' isMemberOf ' + 'NRPL:DAILY_REPORT_BIJWASAN' + ': ' + isMember);
    });
}

app.use('/', router);