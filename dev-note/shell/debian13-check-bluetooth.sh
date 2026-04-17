#!/bin/bash 

#sudo apt install pulseaudio-module-bluetooth

systemctl --user is-active pulseaudio || systemctl --user start pulseaudio
pactl list cards short | grep bluez && echo "audio registered" || echo "no registere audio, please do again"

