'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
const path=require('path');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn

const Gpio = require('onoff').Gpio;
const io = require('socket.io-client');
const SPI = require('pi-spi');

var async = require('async');
var u = require('lodash');
var fs = require('fs');

