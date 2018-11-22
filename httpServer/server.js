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
var delExPrInitDB = require('./delExPrInitDB')
var delExMrInitDB = require('./delExMrInitDB')
var revPumpingPnpDelhiInitDB = require('./revPumpingPnpDelhiInitDB')
var delDeliveryInitDB = require('./delDeliveryInitDB');
var delDeliveryRevInitDB = require('./delDeliveryRevInitDB');
var deliveryPnpInitDB = require('./deliveryPnpInitDB');
var pumpingDelhiPnpInitDB = require('./pumpingDelhiPnpInitDB');

var pumpedFromMathuraMDInitDB = require('./pumpedFromMathuraMDInitDB')
var equiRunningHrsBijInitDB = require('./equiRunningHrsBijInitDB')
var proInStationLinefillInitDB = require('./proInStationLinefillInitDB')
var monitoringMtMbMdplInitDB = require('./monitoringMtMbMdplInitDB')

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
rule.minute = 6;
schedule.scheduleJob(rule, function() {
  (async () => {
      MongoClient.connect("mongodb://localhost:27017/operationsDB",{
        useNewUrlParser: true
    }, function(err, database) {
          if (err) return
        database.db('operationsDB').collection('deliveryPnpInitDB').insertOne(deliveryPnpInitDB.DeliveryPnpInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('pumpingDelhiPnpInitDB').insertOne(pumpingDelhiPnpInitDB.pumpingDelhiPnpInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('revPumpingPnpDelhi').insertOne(revPumpingPnpDelhiInitDB.revPumpingPnpDelhiInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('delhiExMr').insertOne(delExMrInitDB.delExMrInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('delDelivery').insertOne(delDeliveryInitDB.delDeliveryInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('delDeliveryRev').insertOne(delDeliveryRevInitDB.delDeliveryRevInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('skoLbtPumping').insertOne(skoLbtPumpingInitDB.skoLbtPumpingInitDB, function(er, records) {
              if (er) throw er;
              console.log(records)
          });
        database.db('operationsDB').collection('delhiExPr').insertOne(delExPrInitDB.delExPrInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('pumpedFromMathuraMD').insertOne(pumpedFromMathuraMDInitDB.pumpedFromMathuraMDInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('equiRunningHrsBij').insertOne(equiRunningHrsBijInitDB.equiRunningHrsBijInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('proInStationLinefill').insertOne(proInStationLinefillInitDB.proInStationLinefillInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('monitoringMtMbMdpl').insertOne(monitoringMtMbMdplInitDB.monitoringMtMbMdplInitDB, function(er, records) {
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
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
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

app.route('/getDelhiDeliveryRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('delDelivery').aggregate([{
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

app.route('/getRevPumpingPnpDelhiRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('revPumpingPnpDelhi').aggregate([{
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

app.route('/editRevPumpingPnpDelhiRecord')
    .post(function(req, res) {
    console.log(req.body)
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('revPumpingPnpDelhi').updateOne({
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
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
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


    app.route('/editDelhiExPrRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delhiExPr').updateOne({
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

    app.route('/editDelhiDeliveryRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delDelivery').updateOne({
                "_id": req.body._id
            }, {
                $set: req.body
            }, function(err, result) {
                console.log(err)
                console.log(result)
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

app.route('/getDelhiExPrRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('delhiExPr').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delhiExPr').aggregate([{
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

 app.route('/editDelhiDeliveryRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delDelivery').updateOne({
                "_id": req.body._id
            }, {
                $set: req.body
            }, function(err, result) {
                console.log(err)
                console.log(result)
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

app.route('/getDelhiExPrRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('delhiExPr').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delhiExPr').aggregate([{
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
    app.route('/editpumpedFromMathuraMDRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('pumpedFromMathuraMD').updateOne({
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

    app.route('/editpumpedFromMathuraMDRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('pumpedFromMathuraMD').updateOne({
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


app.route('/getpumpedFromMathuraMDRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('pumpedFromMathuraMD').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('pumpedFromMathuraMD').aggregate([{
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


    app.route('/editEquiRunningHrsBijwasanRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('equiRunningHrsBij').updateOne({
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

app.route('/getEquiRunningHrsBijwasanRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('equiRunningHrsBij').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('equiRunningHrsBij').aggregate([{
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



    app.route('/editProductInStationLinefillRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('proInStationLinefill').updateOne({
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

app.route('/getProductInStationLinefillRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('proInStationLinefill').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('proInStationLinefill').aggregate([{
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

    app.route('/editDelhiDeliveryRevRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delDeliveryRev').updateOne({
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

app.route('/getDelhiDeliveryRevRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            database.db('operationsDB').collection('delDeliveryRev').findOne({}, function(err, result) {
                if (err) throw err;

            });
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('delDeliveryRev').aggregate([{
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

    app.route('/editMonitoringMtMbMdplRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB",{
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('monitoringMtMbMdpl').updateOne({
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

app.route('/getMonitoringMtMbMdplRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('monitoringMtMbMdpl').aggregate([{
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