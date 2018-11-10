// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const http = require('http');
// const app = express();
// app.use(express.json());
// // const api = require('./server/routes/api');

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({extended: false}));

// // Angular DIST output folder
// var change2 = 3;
// var relayState = 'off';
// var RGB = 'LOW'
// setInterval(function(){change = Math.random()*10;change2 = 19+Math.random()*0.4},500);
// app.get('/api',function(req,res){
//     res.send([{"temp":change2,"relayState":relayState,"RGB":RGB}])
// })


// app.put('/api/relay',(req,res)=>{
//     console.log('Relay put was accessed!')
//     console.log(req.body)
//     // look for relay
//     // if not exist, 404
//     relayState = req.body.relayState;
//     res.send('{working:"test"}');
    
// })
// app.put('/api/RGB/:RGB',(req,res)=>{
//     // look for relay
//     // if not exist, 404
//     RGB = req.body.RGB;
//     res.send(RGB);
// })
// app.use(express.static(path.join(__dirname,'dist/PiApp')));
// // Send all other requests to the Angular App
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,'dist/PiApp/index.html'));

// });
// const port = process.env.PORT || '3000';
// app.set('port',port);
// app.listen(port,()=>{console.log(`Server listening on port ${port}...`)});

// Dependencies
var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var SerialPort = require('serialport');
const firebase = require("firebase");
const http = require('http');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'dist/PiApp')));
// Required for side-effects
require("firebase/firestore");
// Firebase credentials
firebase.initializeApp({
    apiKey: 'AIzaSyDFIaTJFtaj08-4raJGh0ezCv3HvLmH2G4',
    authDomain: 'arduinoproj-7c927.firebaseapp.com',
    projectId: 'arduinoproj-7c927'
});
var db = firebase.firestore();
// Create port Object
var port = new SerialPort('COM5', {
  baudRate: 9600
});
// var Readline = SerialPort.parsers.Readline
// variable stores data from the SerialPort Readline Object
var temp = "";
// Instantiate the parser
var parser = new SerialPort.parsers.Readline()
// pipe the parser into the port Object
port.pipe(parser);
// var docRefLed = db.collection("devices").doc("temp");

// Every three seconds, set the temperature and write (tx) to the serialport so the arduino can receive data
var onoff = '1'
  setInterval(() => {
    db.collection("devices").doc("temp").set({
        temp1: temp
    });

    //   if(onoff=='1'){
    //     onoff = '0'
    // }
    // else{
    //     onoff = '1'
    // }
    // port.write(onoff, function(err) {
    //     if (err) {
    //       return console.log('Error on write: ', err.message);
    //     }
    //     // console.log('message written');
    //   });

  }, 60000*60)
  
//   listen to incoming data from the arduino
parser.on('data', function (data) {

    console.log(data.toString());
    change2=data.toString()
    // temp = data.toString().substring(21,26);
        temp = data.toString();

    
});
// Control the RGB LED and RELAY
// var docRefLed = db.collection("devices").doc("rgbled");
  setInterval(() => {
      console.log(`RGB IS ${RGB}`)
    
    // setTimeout(()=>{  port.write(RGB.toString(),(err)=>{if(err){console.log(err)}})},3000)
  
    // db.collection("devices").doc("relay").set({
    //     relay: relayState
    // });
    // docRefLed.get().then(function (doc) {
        // console.log((doc.data().r+'ss'));
    //    port.write(doc.data().r, function(err) {
    //     if (err) {
    //       return console.log('Error on write: ', err.message);
    //     }})
   
     
    // }).catch(function (error) {
        // console.log("Error getting document:", error);
    // });
}, 4000)



// Angular DIST output folder
var change2 = 3;
var relayState = 'off';
var RGB = 25
// setInterval(function(){change = Math.random()*10;change2 = 19+Math.random()*0.4},500);
app.get('/api',function(req,res){
    res.send([{"temp":change2,"relayState":relayState,"RGB":RGB}])
});


app.put('/api/relay',(req,res)=>{
    console.log('Relay put was accessed!')
    console.log(req.body)
    // look for relay
    // if not exist, 404
    relayState = req.body.relayState;
    if(relayState=="on"){
        console.log("In relayState on")
        port.write("3", function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }})
    }
    else{
        console.log("In relayState off")
        port.write("2", function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }})
    }
    res.send('{working:"test"}');
    
})
app.put('/api/RGB',(req,res)=>{
    // look for relay
    // if not exist, 404
    console.log('RGB put was accessed!')
    RGB = req.body.RGB;
    console.log('req.body.rgb is'+req.body.RGB)
    res.send('{working:"test"}');
    RGB = req.body.RGB;
    if(req.body.RGB=="OFF"){
        port.write("0",(err)=>{if(err){console.log(err)}})
    }
    else if(req.body.RGB=="MED"){
        port.write("67",(err)=>{if(err){console.log(err)}})
    }
    else{
        port.write("255",(err)=>{if(err){console.log(err)}})
    }
  
})
app.get("/chart",(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/PiApp/chart.html'));

});

// Send all other requests to the Angular App
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/PiApp/index.html'));

});


// app.get('/',(req,res)=>{
//     res.send(`<h1>${temp}</hl>`)
// })
app.listen(3000,()=>{
    console.log('Server started on port 3000...')
})