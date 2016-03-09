#!/bin/bash

# sudo apt-get install git wget automake autoconf libtool yasm nasm phablet-tools
sudo pacman -S git wget automake autoconf libtool yasm nasm
sudo yaourt -S phablet-tools


git clone https://github.com/Parrot-Developers/arsdk_manifests.git
# repo sync

./build.sh -p Unix-forall -t build-sdk -j
