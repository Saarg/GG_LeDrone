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
fi

repo init -u https://github.com/Parrot-Developers/arsdk_manifests.git
repo sync

./build.sh -p Unix-forall -t build-sdk -j
