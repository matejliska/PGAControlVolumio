'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
const path=require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

const Gpio = require('onoff').Gpio;
const io = require('socket.io-client');
var SPI = require('pi-spi');
const Rotary = require('raspberrypi-rotary-encoder');

var async = require('async');
var u = require('lodash');
var fs = require('fs');


const pinClk = 4; //GPIO 23
const pinDt = 5; //GPIO 24
const pinSwitch = 3;  // Optional switch

const rotary = new Rotary(pinClk, pinDt, pinSwitch);

var spi = SPI.initialize("/dev/spidev0.0"),
    test = Buffer.from("Hello, World!");


    rotary.on("rotate", (delta) => {
      console.log("Rotation :"+delta);
        spi.write(test, function (e,d) {
            if (e) console.error(e);
            else console.log("Got \""+d.toString()+"\" back.");

            if (test.toString() === d.toString()) {
                console.log(msg);
            } else {
                // NOTE: this will likely happen unless MISO is jumpered to MOSI
                console.warn(msg);
                process.exit(-2);
            }
        });

    });
    rotary.on("pressed", () => {
      console.log("Rotary switch pressed");
    });
    rotary.on("released", () => {
      console.log("Rotary switch released");
    });


spi.transfer(test, test.length, function (e,d) {
    if (e) console.error(e);
    else console.log("Got \""+d.toString()+"\" back.");
    
    if (test.toString() === d.toString()) {
        console.log(msg);
    } else {
        // NOTE: this will likely happen unless MISO is jumpered to MOSI
        console.warn(msg);
        process.exit(-2);
    }
});



