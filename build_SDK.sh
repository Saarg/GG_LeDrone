#!/bin/bash

sudo apt-get install git wget automake autoconf libtool yasm nasm

repo init -u https://github.com/Parrot-Developers/arsdk_manifests.git
repo sync

bash build.sh -p Unix-forall -t build-sdk -j
