'use strict';

var fs = require('fs-extra');
var libFsExtra = require('fs-extra');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var libQ = require('kew');
var config = new (require('v-conf'))();

var SPI = require('pi-spi');
var spi = SPI.initialize("/dev/spidev0.0");


module.exports = SPIvolumecontrol;

function SPIvolumecontrol(context) {
  var self = this;
  self.context = context;
  self.commandRouter = self.context.coreCommand;
  self.logger = self.context.logger;

  this.configManager = this.context.configManager;
};

SPIvolumecontrol.prototype.onVolumioStart = function () {
  var self = this;
  var configFile = this.commandRouter.pluginManager.getConfigurationFile(this.context, 'config.json');
  this.config = new (require('v-conf'))();
  this.config.loadFile(configFile);
  return libQ.resolve();
};


SPIvolumecontrol.prototype.getConfigurationFiles = function()
{
	return ['config.json'];
}


SPIvolumecontrol.prototype.onStart = function () {
  var self = this;
  var defer = libQ.defer();
    self.logger.info('SPIvolumecotrol Started');
  return defer.promise;
};


SPIvolumecontrol.prototype.onRestart = function () {
  var self = this;
};

SPIvolumecontrol.prototype.onInstall = function () {
  var self = this;
  //	//Perform your installation tasks here
};

SPIvolumecontrol.prototype.onUninstall = function () {
  var self = this;
  //Perform your installation tasks here
};

SPIvolumecontrol.prototype.getUIConfig = function () {
  var self = this;
  var defer = libQ.defer();
  var lang_code = this.commandRouter.sharedVars.get('language_code');
  self.commandRouter.i18nJson(__dirname + '/i18n/strings_' + lang_code + '.json',
    __dirname + '/i18n/strings_en.json',
    __dirname + '/UIConfig.json')
    .then(function (uiconf) {

      uiconf.sections[0].content[0].config.bars[0].value = self.config.get('mg');
   defer.resolve(uiconf);
    })
    .fail(function () {
      defer.reject(new Error());
    });
  return defer.promise;
};


SPIvolumecontrol.prototype.volumeChanged = function (data) {
  var self = this;

  var defer = libQ.defer();

  self.config.set('mg', data['mg']);
  
  self.logger.info('Configurations of equalizer have been set');

  self.rebuildvolSPI()
    .then(function (e) {
      //  self.commandRouter.pushToastMessage('success', "Bauer Configuration updated");
      defer.resolve({});
    })
    .fail(function (e) {
      defer.reject(new Error('error'));
      //  self.commandRouter.pushToastMessage('error', "failed to start. Check your config !");
    })


  return defer.promise;

};

SPIvolumecontrol.prototype.rebuildvolSPI = function () {
  var self = this;
  var defer = libQ.defer();
    
    var outputLR = parseInt(self.config.get('mg'));
    outputLR += 100;
    var outSub = outputLR + 15;
    var test = Buffer.from(outSub, outSub, outputLR, outputLR)

      spi.transfer(test, test.length, function (e,d) {
        if (e) console.error(e);
        else console.log("Got \""+d.toString()+"\" back.");

        if (test.toString() === d.toString()) {
            self.logger.info(msg);
        } else {
            // NOTE: this will likely happen unless MISO is jumpered to MOSI
            self.logger.info(msg);
            process.exit(-2);
        }
       });
  

    
  return defer.promise;
  
};
