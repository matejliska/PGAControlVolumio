'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
const path=require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn

const Gpio = require('onoff').Gpio;
const io = require('socket.io-client');
var SPI = require('pi-spi');
const Rotary = require('raspberrypi-rotary-encoder');

var async = require('async');
var u = require('lodash');
var fs = require('fs');


const pinClk = 0;
const pinDt = 1;
const pinSwitch = 2;  // Optional switch

const rotary = new Rotary(pinClk, pinDt, pinSwitch);

    rotary.on("rotate", (delta) => {
      console.log("Rotation :"+delta);
    });
    rotary.on("pressed", () => {
      console.log("Rotary switch pressed");
    });
    rotary.on("released", () => {
      console.log("Rotary switch released");
    });

var spi = SPI.initialize("/dev/spidev0.0"),
    test = Buffer.from("Hello, World!");


const rotaryTypes = new Array(
	"...",
	"1/1",
	"1/2",
	"...",
	"1/4"
);
