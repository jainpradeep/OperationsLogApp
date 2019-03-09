//db.dropDatabase()
// morgan body-parser method-override mongodb cors path moment lodash multer
var MockDate = require('mockdate');
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
var today =  new Date();
today.setDate(today.getDate() + 3)
MockDate.set(today);
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

    MongoClient.connect("mongodb://localhost:27017/operationsDB",{
        useNewUrlParser: true
    }, function(err, database) {
          if (err) return
        database.db('operationsDB').collection('targetTracker').insertOne(targetTrackerInitDB.targetTrackerInitDB, function(er, records) {
            if (er) throw er;
        });          
        database.db('operationsDB').collection('productPlanningBijwasan').insertOne(productPlanningBijwasanInitDB.productPlanningBijwasanInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('deliveryMeerut').insertOne(deliveryMeerutInitDB.deliveryMeerutInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('exMathuraMD').insertOne(exMathuraMDInitDB.exMathuraMDInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('exMathuraMbpl').insertOne(exMathuraMbplInitDB.exMathuraMbplInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('exMathuraMtpl').insertOne(exMathuraMtplInitDB.exMathuraMtplInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('deliveryTundla').insertOne(deliveryTundlaInitDB.deliveryTundlaInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('deliveryTikrikalan').insertOne(deliveryTikrikalanInitDB.deliveryTikrikalanInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('deliveryBharatpur').insertOne(deliveryBharatpurInitDB.deliveryBharatpurInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('deliveryPnp').insertOne(deliveryPnpInitDB.deliveryPnpInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksBijwasan').insertOne(remarksBijwasanInitDB.remarksBijwasanInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksTundla').insertOne(remarksTundlaInitDB.remarksTundlaInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksMeerut').insertOne(remarksMeerutInitDB.remarksMeerutInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksBhartpur').insertOne(remarksBhartpurInitDB.remarksBhartpurInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksTikrikalan').insertOne(remarksTikrikalanInitDB.remarksTikrikalanInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('remarksMathura').insertOne(remarksMathuraInitDB.remarksMathuraInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('pumpingDelhiPnp').insertOne(pumpingDelhiPnpInitDB.pumpingDelhiPnpInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('revPumpingPnpDelhi').insertOne(revPumpingPnpDelhiInitDB.revPumpingPnpDelhiInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('delhiExMr').insertOne(delExMrInitDB.delExMrInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('delDelivery').insertOne(delDeliveryInitDB.delDeliveryInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('delDeliveryRev').insertOne(delDeliveryRevInitDB.delDeliveryRevInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('skoLbtPumping').insertOne(skoLbtPumpingInitDB.skoLbtPumpingInitDB, function(er, records) {
              if (er) throw er;
              
          });
        database.db('operationsDB').collection('delhiExPr').insertOne(delExPrInitDB.delExPrInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('pumpedFromMathuraMD').insertOne(pumpedFromMathuraMDInitDB.pumpedFromMathuraMDInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('equiRunningHrsBij').insertOne(equiRunningHrsBijInitDB.equiRunningHrsBijInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('proInStationLinefill').insertOne(proInStationLinefillInitDB.proInStationLinefillInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('monitoringMtMbMdpl').insertOne(monitoringMtMbMdplInitDB.monitoringMtMbMdplInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('lbtTable').insertOne(lbtTableInitDB.lbtTableInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('lineFillTable').insertOne(lineFillTableInitDB.lineFillTableInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('shutdown').insertOne(shutdownInitDB.shutdownInitDB, function(er, records) {
            if (er) throw er;
            
        });
        database.db('operationsDB').collection('notes').insertOne(notesInitDB.notesInitDB, function(er, records) {
            if (er) throw er;
            
        });
    })