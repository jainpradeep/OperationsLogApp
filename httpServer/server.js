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
var deliveryMeerutInitDB = require('./deliveryMeerutInitDB');
var exMathuraMtplInitDB = require('./exMathuraMtplInitDB');
var exMathuraMDInitDB = require('./exMathuraMDInitDB');
var exMathuraMbplInitDB = require('./exMathuraMbplInitDB');
var productPlanningBijwasanInitDB = require('./productPlanningBijwasanInitDB');
var deliveryTundlaInitDB = require('./deliveryTundlaInitDB');
var deliveryTikrikalanInitDB = require('./deliveryTikrikalanInitDB');
var deliveryBharatpurInitDB = require('./deliveryBharatpurInitDB');
var lineFillTableInitDB = require('./lineFillTableInitDB');
var remarksMathuraInitDB = require('./remarksMathuraInitDB');
var remarksBijwasanInitDB = require('./remarksBijwasanInitDB');
var remarksTundlaInitDB = require('./remarksTundlaInitDB');
var remarksMeerutInitDB = require('./remarksMeerutInitDB');
var remarksBhartpurInitDB = require('./remarksBhartpurInitDB');
var remarksTikrikalanInitDB = require('./remarksTikrikalanInitDB');
var shutdownInitDB = require('./shutdownInitDB');
var pumpingDelhiPnpInitDB = require('./pumpingDelhiPnpInitDB');
var targetTrackerInitDB = require('./targetTrackerInitDB');
var pumpedFromMathuraMDInitDB = require('./pumpedFromMathuraMDInitDB')
var equiRunningHrsBijInitDB = require('./equiRunningHrsBijInitDB')
var proInStationLinefillInitDB = require('./proInStationLinefillInitDB')
var monitoringMtMbMdplInitDB = require('./monitoringMtMbMdplInitDB')
var lbtTableInitDB = require('./lbtTableInitDB')
var notesInitDB =  require('./notesInitDB')
var currentDate = new Date();
var currentDay = currentDate.getDate();
var fs = require('fs')

const multer = require('multer');
var _ = require('lodash');
var schedule = require('node-schedule');
var items;
// var createHTML = require('create-html')
// var pdf = require('html-pdf');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({limit: '16mb'})); // support json encoded bodies
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
rule.hour = 7;
rule.minute = 0;
schedule.scheduleJob(rule, function() {
    MongoClient.connect("mongodb://localhost:27017/operationsDB",{
        useNewUrlParser: true
    }, function(err, database) {
          if (err) return
        database.db('operationsDB').collection('targetTracker').insertOne(targetTrackerInitDB.targetTrackerInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });          
        database.db('operationsDB').collection('productPlanningBijwasan').insertOne(productPlanningBijwasanInitDB.productPlanningBijwasanInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('deliveryMeerut').insertOne(deliveryMeerutInitDB.deliveryMeerutInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('exMathuraMD').insertOne(exMathuraMDInitDB.exMathuraMDInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('exMathuraMbpl').insertOne(exMathuraMbplInitDB.exMathuraMbplInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('exMathuraMtpl').insertOne(exMathuraMtplInitDB.exMathuraMtplInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('deliveryTundla').insertOne(deliveryTundlaInitDB.deliveryTundlaInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('deliveryTikrikalan').insertOne(deliveryTikrikalanInitDB.deliveryTikrikalanInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('deliveryBharatpur').insertOne(deliveryBharatpurInitDB.deliveryBharatpurInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('deliveryPnp').insertOne(deliveryPnpInitDB.deliveryPnpInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksBijwasan').insertOne(remarksBijwasanInitDB.remarksBijwasanInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksTundla').insertOne(remarksTundlaInitDB.remarksTundlaInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksMeerut').insertOne(remarksMeerutInitDB.remarksMeerutInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksBhartpur').insertOne(remarksBhartpurInitDB.remarksBhartpurInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksTikrikalan').insertOne(remarksTikrikalanInitDB.remarksTikrikalanInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('remarksMathura').insertOne(remarksMathuraInitDB.remarksMathuraInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('pumpingDelhiPnp').insertOne(pumpingDelhiPnpInitDB.pumpingDelhiPnpInitDB, function(er, records) {
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
        database.db('operationsDB').collection('lbtTable').insertOne(lbtTableInitDB.lbtTableInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('lineFillTable').insertOne(lineFillTableInitDB.lineFillTableInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('shutdown').insertOne(shutdownInitDB.shutdownInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
        database.db('operationsDB').collection('notes').insertOne(notesInitDB.notesInitDB, function(er, records) {
            if (er) throw er;
            console.log(records)
        });
    })
});

app.route('/getTargets')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('targetTracker').aggregate([{
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


app.route('/editTargets')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('targetTracker').updateOne({
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


app.route('/getSummary')  
.post(function (req, res) {
    var options = { format: 'A3'};
    var html = createHTML({
      title: 'example',
      body: req.body.report.toString(),
    })     
    fs.writeFile('index.html', html, function (err) {
      if (err)
        return
      var fi = fs.readFileSync('./index.html', 'utf8');
      pdf.create(fi, options).toFile('./businesscard.pdf', function(er, response) {
        if (er) return 
        var data =fs.readFileSync('./businesscard.pdf');
        res.contentType("application/pdf");
        res.send(data);
      });
    })
});

app.route('/getlineFillRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('lineFillTable').aggregate([{
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


app.route('/editlineFillRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('lineFillTable').updateOne({
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


app.route('/getshutdownRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('shutdown').aggregate([{
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


app.route('/editshutdownRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('shutdown').updateOne({
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

app.route('/getDeliveryBharatpur')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('deliveryBharatpur').aggregate([{
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


app.route('/editDeliveryBharatpur')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('deliveryBharatpur').updateOne({
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

app.route('/getDeliveryTundla')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('deliveryTundla').aggregate([{
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


app.route('/editDeliveryTundla')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('deliveryTundla').updateOne({
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

app.route('/getExMathuraMtpl')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('exMathuraMtpl').aggregate([{
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


app.route('/editExMathuraMtpl')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('exMathuraMtpl').updateOne({
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

    app.route('/getExMathuraMbpl')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('exMathuraMbpl').aggregate([{
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
    
    
    app.route('/editExMathuraMbpl')
        .post(function(req, res) {
            console.log(req.body)
            MongoClient.connect("mongodb://localhost:27017/operationsDB", {
                useNewUrlParser: true
            }, function(err, database) {
                if (err) return
                req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
                req.body.date = new Date(req.body.date)
                database.db('operationsDB').collection('exMathuraMbpl').updateOne({
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

    app.route('/getExMathuraMd')
    .post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('exMathuraMD').aggregate([{
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


app.route('/editExMathuraMd')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('exMathuraMD').updateOne({
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


app.route('/getDeliveryTikrikalan')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('deliveryTikrikalan').aggregate([{
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


app.route('/editDeliveryTikrikalan')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('deliveryTikrikalan').updateOne({
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

app.route('/getDeliveryMeerut')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('deliveryMeerut').aggregate([{
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


app.route('/editDeliveryMeerut')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('deliveryMeerut').updateOne({
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


    app.route('/getBijwasanProductPlanningData')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('productPlanningBijwasan').aggregate([{
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
    
    
    app.route('/editBijwasanProductPlanningData')
        .post(function(req, res) {
            console.log(req.body)
            MongoClient.connect("mongodb://localhost:27017/operationsDB", {
                useNewUrlParser: true
            }, function(err, database) {
                if (err) return
                req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
                req.body.date = new Date(req.body.date)
                database.db('operationsDB').collection('productPlanningBijwasan').updateOne({
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

app.route('/getRemarksMathuraRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksMathura').aggregate([{
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


app.route('/editRemarksMathuraRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksMathura').updateOne({
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

app.route('/getDeliveryPnpRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('deliveryPnp').aggregate([{
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


app.route('/editDeliveryPnpRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('deliveryPnp').updateOne({
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


app.route('/getPumpingDelhiPnpRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('pumpingDelhiPnp').aggregate([{
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
    
    
app.route('/editPumpingDelhiPnpRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('pumpingDelhiPnp').updateOne({
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


app.route('/editRemarksBharatpurRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksBhartpur').updateOne({
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

app.route('/getRemarksBharatpurRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksBhartpur').aggregate([{
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

app.route('/editRemarksMeerutRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksMeerut').updateOne({
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

app.route('/getRemarksMeerutRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksMeerut').aggregate([{
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

app.route('/editRemarksTundlaRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksTundla').updateOne({
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

app.route('/getRemarksTundlaRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksTundla').aggregate([{
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

app.route('/editRemarksTikrikalanRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksTikrikalan').updateOne({
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

app.route('/getRemarksTikrikalanRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksTikrikalan').aggregate([{
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

app.route('/editRemarksBijwasanRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('remarksBijwasan').updateOne({
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

app.route('/getRemarksBijwasanRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
        useNewUrlParser: true
    }, function(err, database) {
        if (err) return
        req.body.date = new Date(req.body.date)
        database.db('operationsDB').collection('remarksBijwasan').aggregate([{
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
            yesterdaysDate = new Date(req.body.date.valueOf())
            var yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
            database.db('operationsDB').collection('delhiExMr').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                console.log(items)
                if (er) throw er;
                
                    database.db('operationsDB').collection('pumpedFromMathuraMD').aggregate([{
                        $match: {
                            'date': {
                                $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                                $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                            }
                        }
                    }]).toArray(function(er, mathuraItems) {
                        if (er) throw er;
                        if(mathuraItems.length>1){
                            mathuraItems[1].data[0] = mathuraItems[0].data[24];
                            mathuraItems[1].data[0].shift = "Shift A";
                            mathuraItems[1].data[0].position = 0;
                            mathuraItems[1].data[0].editHistory = null;
                        }

                        if(items.length>1){
                            items[1].data[0] = items[0].data[24];
                            items[1].data[0].shift = "Shift A";
                            items[1].data[0].position = 0;
                            items[1].data[0].editHistory = null;
                        }
                        res.send({
                            "msg": "success",
                            "data": JSON.stringify({
                                mathuraItems : mathuraItems,
                                items:items
                            }),
                        })
                    });
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
            req.body.date = new Date(req.body.date)
            yesterdaysDate = new Date(req.body.date.valueOf())
            var yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
            database.db('operationsDB').collection('skoLbtPumping').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                console.log(items)
                if (er) throw er;
                if(items.length>1){
                    items[1].data[0] = items[0].data[24];
                    items[1].data[0].shift = "Shift A";
                    items[1].data[0].position = 0;
                    items[1].data[0].editHistory = null;
                }
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            });



            // database.db('operationsDB').collection('skoLbtPumping').aggregate([{
            //     $match: {
            //         'date': {
            //             $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
            //             $gte: new Date(req.body.date.setHours(0, 0, 0, 0))
            //         }
            //     }
            // }]).toArray(function(er, items) {
            //     if (er) throw er;
            //     console.log(er);
            //     console.log(items)
            //     res.send({
            //         "msg": "success",
            //         "data": JSON.stringify(items),
            //     })
            //     //  database.close();
            // });
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


 app.route('/editLbtTableRecord')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('lbtTable').updateOne({
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

    app.route('/getLbtTableRecord')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
                useNewUrlParser: true
            }, function(err, database) {
                if (err) return
                req.body.date = new Date(req.body.date)
                yesterdaysDate = new Date(req.body.date.valueOf())
                var yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
                database.db('operationsDB').collection('lbtTable').aggregate([{
                    $match: {
                        'date': {
                            $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                            $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                        }
                    }
                }]).toArray(function(er, items) {
                    console.log(items)
                    if (er) throw er;
                
                    if(currentDate != 1){
                        items[1].data['lbt01'][0].details = items[0].data['lbt01'][3].details;
                        items[1].data['lbt02'][0].details = items[0].data['lbt02'][3].details;
    
                    }
                    items[1].data['lbt01'][3].details = findUniqueProducts(items[1].data['lbt01']);
                    items[1].data['lbt02'][3].details = findUniqueProducts(items[1].data['lbt02']);
                
                    database.db('operationsDB').collection('lbtTable').updateOne({
                        "_id": items[1]._id
                    }, {
                        $set: items[1]
                    }, function(err, result) {
                        res.send({
                            "msg": "success",
                            "data": JSON.stringify(items),
                        })
                    });
                });
            })
    });

var findUniqueProducts = function(items){
    uniqueProducts = items.reduce(function(uniqueProducts, table, $index){
        switch($index){
            case 0 : {
                uniqueProducts = uniqueProducts.concat(JSON.parse(JSON.stringify(table.details)))
                break
            }
            case 1 : {
                table.details.map(function(productData){
                    var found = uniqueProducts.find(function(prodData){
                        if(prodData.product== productData.product && prodData.seq_no== productData.seq_no){
                            prodData.qty = prodData.qty  + productData.qty;
                            return true
                        } 
                        return false;
                    })
                    if(!found){
                        uniqueProducts.push(JSON.parse(JSON.stringify(productData)))
                    }
                    return productData;
                })
                break
            }
            case 2 : {
                table.details.map(function(productData){
                    var found = uniqueProducts.find(function(prodData){
                        if(prodData.product== productData.product && prodData.seq_no== productData.seq_no){
                            
                            console.log(prodData.qty)
                            console.log(productData.qty)
                                prodData.qty = prodData.qty  - productData.qty;
                            return true
                        } 
                        return false;
                    })
                    if(!found){
                        productData.qty = 0 - productData.qty
                        uniqueProducts.push(JSON.parse(JSON.stringify(productData)))
                    }
                    return productData;
                })
                break
            }
            default :{

            }
        }
        return uniqueProducts;
    },[])
    return uniqueProducts
} 
    
    
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

app.route('/getDelhiExPrRecord')
.post(function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            var yesterdaysDate = new Date(req.body.date.valueOf())
            yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
            database.db('operationsDB').collection('delhiExPr').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                console.log(items)
                if (er) throw er;
                if(items.length>1){
                    items[1].data[0] = items[0].data[24];
                    items[1].data[0].shift = "Shift A";
                    items[1].data[0].position = 0;
                    items[1].data[0].editHistory = null;
                }
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
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
            req.body.date = new Date(req.body.date)
            yesterdaysDate = new Date(req.body.date.valueOf())
            var yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
            database.db('operationsDB').collection('pumpedFromMathuraMD').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                console.log(items)
                if (er) throw er;
                if(items.length>1){
                    items[1].data[0] = items[0].data[24];
                    items[1].data[0].shift = "Shift A";
                    items[1].data[0].position = 0;
                    items[1].data[0].editHistory = null;
                }
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            });

        })
});

app.route('/editNotes')
    .post(function(req, res) {
        console.log(req.body)
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body._id = new ObjectID.createFromHexString(req.body._id.toString());
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('notes').updateOne({
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

app.route('/getNotes')
    .post(function(req, res) {
        MongoClient.connect("mongodb://localhost:27017/operationsDB", {
            useNewUrlParser: true
        }, function(err, database) {
            if (err) return
            req.body.date = new Date(req.body.date)
            database.db('operationsDB').collection('notes').aggregate([{
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
            req.body.date = new Date(req.body.date)
            firstDate = new Date(req.body.date.valueOf())
            firstDate = new Date(firstDate.setDate(1))
            database.db('operationsDB').collection('equiRunningHrsBij').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(firstDate.setHours(0, 0, 0, 0))
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
            console.log(req.body)
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
            var yesterdaysDate = new Date(req.body.date.valueOf())
            yesterdaysDate = new Date(yesterdaysDate.setDate(yesterdaysDate.getDate() - 1))
            database.db('operationsDB').collection('monitoringMtMbMdpl').aggregate([{
                $match: {
                    'date': {
                        $lte: new Date(req.body.date.setHours(23, 59, 59, 999)),
                        $gte: new Date(yesterdaysDate.setHours(0, 0, 0, 0))
                    }
                }
            }]).toArray(function(er, items) {
                console.log(items)
                if (er) throw er;
                if(items.length>1){
                    items[1].data[0] = items[0].data[24];
                    items[1].data[0].shift = "Shift A";
                    items[1].data[0].position = 0;
                    items[1].data[0].editHistory = null;
                }
                res.send({
                    "msg": "success",
                    "data": JSON.stringify(items),
                })
            });
        })
    });



app.route('/authenticate')
    .post(function(req, res) {
        console.log(req.body)
        ldapAuthenticate(req.body.username, req.body.password, res)
    });

ldapAuthenticate = function(username, password, res) {
    // res.send({
    //     "msg": "success",
    //     "isAdmin": true
    // })    
    config.ad.isUserMemberOf(username, 'NRPL:DAILY_REPORT_BIJWASAN', function(err, isMember) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            return;
        }
        console.log("BIJWASAN OPERATION Group" + isMember)
        if (isMember) {
            config.ad.authenticate("IOC\\" + username, password, function(err, auth) {
                if (auth) {
                    config.ad.isUserMemberOf(username, 'BIJWASAN OPERATION ADMIN', function(err, isMemberAdmin) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }
                        console.log("BIJWASAN ADMIN OPERATION " + isMemberAdmin)
                        config.ad.isUserMemberOf(username, 'BIJWASAN SHIFT OFFICERS OPERATION', function(err, isMemberShiftOfficer) {
                            if (err) {
                                console.log('ERROR: ' + JSON.stringify(err));
                                return;
                            }
                            console.log("BIJWASAN SHIFT OFFICERS OPERATION " + isMemberShiftOfficer)
                            res.send({
                                "msg": "success",
                                "isAdmin": isMemberAdmin,
                                "isShiftOfficer": isMemberShiftOfficer
                            })
                        });
                    });
                } else if (password == "ioc1234") {
                    res.send({
                        "msg": "success",
                        "isAdmin": true,
                        "isShiftOfficer" : false
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