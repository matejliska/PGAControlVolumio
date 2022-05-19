#!/bin/bash

echo "Installing SPIvolumecontrol dependencies"
libpath=/data/plugins/audio_interface/SPIvolumecontrol

if [ ! -f "/data/configuration/audio_interface/SPIvolumecontrol/config.json" ];
	then
		echo "file doesn't exist, nothing to do"
	else
		echo "File exists removing it"
		sudo rm /data/configuration/audio_interface/SPIvolumecontrol/config.json
fi
sudo systemctl daemon-reload
#required to end the plugin install
echo "plugininstallend"
