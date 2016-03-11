#!/bin/bash

if [[ $1 == "help" ]]; then
    echo "Pour télécharger et compiler le SDK parrot"
    echo "Sous debian(apt-get):"
    echo "    bash build_SDK.sh"
    echo "Sous Arch Linux(pacman & yaourt):"
    echo "    bash build_SDK.sh arch"
    echo "Pour juste télécharger les sources et les compiler:"
    echo "    bash build_SDK.sh build"
    exit
fi

if [[ $1 == "arch" ]]; then
    sudo pacman -S git wget automake autoconf libtool yasm nasm
    sudo yaourt -S phablet-tools
elif [[ $1 != "build" ]]; then
    sudo apt-get install git wget automake autoconf libtool yasm nasm phablet-tools
    sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev
    # alors cette ligne la reste a verifier... SDK de merde
    #sudo apt-get install avahi-daemon avahi-discover avahi-utils avahi-ui-utils avahi-dnsconfd libnss-mdns service-discovery-applet mdns-scan.
    # ya un truc a installer mais je sais plus quoi... avahi*
    #https://launchpad.net/ubuntu/%2Bsource/avahi
    sudo apt-get install mplayer libav-tools
fi

repo init -u https://github.com/Parrot-Developers/arsdk_manifests.git
repo sync

./build.sh -p Unix-forall -t build-sdk -j
