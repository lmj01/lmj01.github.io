#!/bin/bash 

./configure -prefix ~/opt/ -opensource -confirm-license \
            -skip qtwebengine -nomake examples -nomake tests
cmake --build . --parallel $(nproc)
sudo cmake --install .

